// Test script to verify admin authentication and role-based routing
// Using native fetch API (available in Node.js 18+)

const API_BASE_URL = "http://localhost:5001/api";

// Test admin login
const testAdminLogin = async () => {
  try {
    console.log("🧪 Testing admin login...");

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "admin@gmail.com",
        password: "12345678",
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("✅ Admin login successful!");
      console.log("User data:", {
        id: data.data.user.id,
        email: data.data.user.email,
        role: data.data.user.role,
        full_name: data.data.user.full_name,
      });

      // Decode JWT token to verify role
      const token = data.data.token;
      const payload = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString(),
      );

      console.log("JWT payload:", {
        userId: payload.userId,
        role: payload.role,
        email: payload.email,
        exp: new Date(payload.exp * 1000).toISOString(),
      });

      // Test protected route with admin token
      await testAdminRoute(token);

      return { success: true, role: payload.role };
    } else {
      console.log("❌ Admin login failed:", data.message);
      return { success: false, error: data.message };
    }
  } catch (error) {
    console.log("❌ Admin login error:", error.message);
    return { success: false, error: error.message };
  }
};

// Test regular user login
const testUserLogin = async () => {
  try {
    console.log("\n🧪 Testing regular user login...");

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "wasongamoses14@gmail.com",
        password: "password123",
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("✅ User login successful!");
      console.log("User data:", {
        id: data.data.user.id,
        email: data.data.user.email,
        role: data.data.user.role,
        full_name: data.data.user.full_name,
      });

      // Decode JWT token to verify role
      const token = data.data.token;
      const payload = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString(),
      );

      console.log("JWT payload:", {
        userId: payload.userId,
        role: payload.role,
        email: payload.email,
        exp: new Date(payload.exp * 1000).toISOString(),
      });

      return { success: true, role: payload.role };
    } else {
      console.log("❌ User login failed:", data.message);
      return { success: false, error: data.message };
    }
  } catch (error) {
    console.log("❌ User login error:", error.message);
    return { success: false, error: error.message };
  }
};

// Test admin-only route
const testAdminRoute = async (token) => {
  try {
    console.log("\n🧪 Testing admin-only route access...");

    const response = await fetch(`${API_BASE_URL}/admin/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      console.log("✅ Admin route access successful!");
      console.log(`Found ${data.data?.users?.length || 0} users in the system`);
    } else {
      console.log("❌ Admin route access failed:", data.message);
    }
  } catch (error) {
    console.log("❌ Admin route test error:", error.message);
  }
};

// Main test function
const runTests = async () => {
  console.log("🚀 Starting authentication tests...\n");

  // Test admin login
  const adminResult = await testAdminLogin();

  // Test regular user login
  const userResult = await testUserLogin();

  console.log("\n📊 Test Results Summary:");
  console.log("========================");

  if (adminResult.success) {
    console.log(`✅ Admin login: SUCCESS (Role: ${adminResult.role})`);

    // Check if role is properly capitalized
    if (adminResult.role === "Admin") {
      console.log("✅ Admin role capitalization: CORRECT");
    } else {
      console.log(
        `❌ Admin role capitalization: INCORRECT (Expected: Admin, Got: ${adminResult.role})`,
      );
    }
  } else {
    console.log(`❌ Admin login: FAILED (${adminResult.error})`);
  }

  if (userResult.success) {
    console.log(`✅ User login: SUCCESS (Role: ${userResult.role})`);

    // Check if role is properly capitalized
    if (userResult.role === "User") {
      console.log("✅ User role capitalization: CORRECT");
    } else {
      console.log(
        `❌ User role capitalization: INCORRECT (Expected: User, Got: ${userResult.role})`,
      );
    }
  } else {
    console.log(`❌ User login: FAILED (${userResult.error})`);
  }

  console.log("\n🎯 Frontend Routing Guidance:");
  console.log("=============================");
  console.log("Based on JWT token role values:");
  console.log("• Admin users should be redirected to: /admin/dashboard");
  console.log("• Regular users should be redirected to: /dashboard");
  console.log("• Driver users should be redirected to: /driver/dashboard");

  console.log("\n✨ Tests completed!");
};

// Run the tests
runTests().catch(console.error);
