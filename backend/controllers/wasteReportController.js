import { supabase } from '../config/supabase.js';
import { TABLES, REPORT_STATUS } from '../config/database.js';
import { successResponse, errorResponse, paginate } from '../utils/helpers.js';

// Create waste report (User)
export const createReport = async (req, res) => {
  try {
    const { location, latitude, longitude, description, wasteType, imageUrl } = req.body;
    const userId = req.user.id;

    const { data: report, error } = await supabase
      .from(TABLES.WASTE_REPORTS)
      .insert([
        {
          user_id: userId,
          location,
          latitude,
          longitude,
          description,
          waste_type: wasteType,
          image_url: imageUrl,
          status: REPORT_STATUS.PENDING,
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Create report error:', error);
      return errorResponse(res, 'Failed to create report', 500);
    }

    // Award points to user for reporting
    await supabase.rpc('increment_user_points', {
      user_id: userId,
      points: 10
    });

    return successResponse(res, report, 'Report created successfully', 201);
  } catch (error) {
    console.error('Create report error:', error);
    return errorResponse(res, 'Failed to create report', 500);
  }
};

// Get all reports with filters
export const getReports = async (req, res) => {
  try {
    const { status, wasteType, page = 1, limit = 10 } = req.query;
    const { offset, limit: pageLimit } = paginate(parseInt(page), parseInt(limit));

    let query = supabase
      .from(TABLES.WASTE_REPORTS)
      .select(`
        *,
        users (
          id,
          full_name,
          avatar_url
        )
      `, { count: 'exact' });

    // Apply filters
    if (status) {
      query = query.eq('status', status);
    }

    if (wasteType) {
      query = query.eq('waste_type', wasteType);
    }

    // Order by created date
    query = query.order('created_at', { ascending: false });

    // Pagination
    query = query.range(offset, offset + pageLimit - 1);

    const { data: reports, error, count } = await query;

    if (error) {
      console.error('Get reports error:', error);
      return errorResponse(res, 'Failed to get reports', 500);
    }

    return successResponse(res, {
      reports,
      pagination: {
        page: parseInt(page),
        limit: pageLimit,
        total: count,
        totalPages: Math.ceil(count / pageLimit)
      }
    }, 'Reports retrieved successfully');
  } catch (error) {
    console.error('Get reports error:', error);
    return errorResponse(res, 'Failed to get reports', 500);
  }
};

// Get single report by ID
export const getReportById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: report, error } = await supabase
      .from(TABLES.WASTE_REPORTS)
      .select(`
        *,
        users (
          id,
          full_name,
          avatar_url,
          phone
        ),
        driver_assignments (
          id,
          status,
          drivers (
            id,
            full_name,
            phone,
            vehicle_number
          )
        )
      `)
      .eq('id', id)
      .single();

    if (error || !report) {
      return errorResponse(res, 'Report not found', 404);
    }

    return successResponse(res, report, 'Report retrieved successfully');
  } catch (error) {
    console.error('Get report error:', error);
    return errorResponse(res, 'Failed to get report', 500);
  }
};

// Update report status (Admin/Driver)
export const updateReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const updateData = { status };
    if (notes) updateData.notes = notes;
    if (status === REPORT_STATUS.COMPLETED) {
      updateData.completed_at = new Date().toISOString();
    }

    const { data: report, error } = await supabase
      .from(TABLES.WASTE_REPORTS)
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update report status error:', error);
      return errorResponse(res, 'Failed to update report status', 500);
    }

    return successResponse(res, report, 'Report status updated successfully');
  } catch (error) {
    console.error('Update report status error:', error);
    return errorResponse(res, 'Failed to update report status', 500);
  }
};

// Delete report (Admin only)
export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from(TABLES.WASTE_REPORTS)
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete report error:', error);
      return errorResponse(res, 'Failed to delete report', 500);
    }

    return successResponse(res, null, 'Report deleted successfully');
  } catch (error) {
    console.error('Delete report error:', error);
    return errorResponse(res, 'Failed to delete report', 500);
  }
};

// Get user's reports
export const getUserReports = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: reports, error } = await supabase
      .from(TABLES.WASTE_REPORTS)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Get user reports error:', error);
      return errorResponse(res, 'Failed to get user reports', 500);
    }

    return successResponse(res, reports, 'User reports retrieved successfully');
  } catch (error) {
    console.error('Get user reports error:', error);
    return errorResponse(res, 'Failed to get user reports', 500);
  }
};

// Get nearby reports (for drivers)
export const getNearbyReports = async (req, res) => {
  try {
    const { latitude, longitude, radius = 5 } = req.query; // radius in km

    if (!latitude || !longitude) {
      return errorResponse(res, 'Latitude and longitude are required', 400);
    }

    // Get pending reports
    const { data: reports, error } = await supabase
      .from(TABLES.WASTE_REPORTS)
      .select('*')
      .eq('status', REPORT_STATUS.PENDING)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Get nearby reports error:', error);
      return errorResponse(res, 'Failed to get nearby reports', 500);
    }

    // Filter by distance (simple calculation, can be improved with PostGIS)
    const nearbyReports = reports.filter(report => {
      const distance = calculateDistance(
        parseFloat(latitude),
        parseFloat(longitude),
        report.latitude,
        report.longitude
      );
      return distance <= parseFloat(radius);
    });

    return successResponse(res, nearbyReports, 'Nearby reports retrieved successfully');
  } catch (error) {
    console.error('Get nearby reports error:', error);
    return errorResponse(res, 'Failed to get nearby reports', 500);
  }
};

// Helper function to calculate distance
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRad = (value) => {
  return (value * Math.PI) / 180;
};

export default {
  createReport,
  getReports,
  getReportById,
  updateReportStatus,
  deleteReport,
  getUserReports,
  getNearbyReports
};
