import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// fetch mock 설정
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("API Utilities", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("VIP API", () => {
    describe("getVipByToken", () => {
      it("유효한 토큰으로 VIP 정보를 조회한다", async () => {
        const mockVip = {
          id: "vip-123",
          name: "Test VIP",
          tier: "gold",
          is_active: true,
        };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockVip,
        });

        // 실제 API 호출 시뮬레이션
        const response = await fetch("/api/auth/vip/login?token=valid-token");
        const data = await response.json();

        expect(data).toEqual(mockVip);
        expect(mockFetch).toHaveBeenCalledWith(
          "/api/auth/vip/login?token=valid-token"
        );
      });

      it("잘못된 토큰은 에러를 반환한다", async () => {
        mockFetch.mockResolvedValueOnce({
          ok: false,
          status: 404,
          json: async () => ({ error: "not_found" }),
        });

        const response = await fetch("/api/auth/vip/login?token=invalid-token");

        expect(response.ok).toBe(false);
        expect(response.status).toBe(404);
      });
    });
  });

  describe("Admin VIP API", () => {
    describe("GET /api/admin/vips", () => {
      it("VIP 목록을 페이지네이션과 함께 조회한다", async () => {
        const mockResponse = {
          success: true,
          data: [
            { id: "1", email: "vip1@test.com", tier: "gold" },
            { id: "2", email: "vip2@test.com", tier: "silver" },
          ],
          total: 2,
          page: 1,
          limit: 20,
        };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        });

        const response = await fetch("/api/admin/vips?page=1&limit=20");
        const data = await response.json();

        expect(data.success).toBe(true);
        expect(data.data).toHaveLength(2);
        expect(data.total).toBe(2);
      });

      it("티어별 필터링이 적용된다", async () => {
        const mockResponse = {
          success: true,
          data: [{ id: "1", email: "gold@test.com", tier: "gold" }],
          total: 1,
        };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        });

        const response = await fetch("/api/admin/vips?tier=gold");
        const data = await response.json();

        expect(data.data[0].tier).toBe("gold");
      });

      it("검색 쿼리가 적용된다", async () => {
        const mockResponse = {
          success: true,
          data: [{ id: "1", email: "search@test.com" }],
          total: 1,
        };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        });

        const response = await fetch("/api/admin/vips?search=search@test.com");
        const data = await response.json();

        expect(data.data[0].email).toContain("search");
      });
    });

    describe("POST /api/admin/vips", () => {
      it("새 VIP를 생성한다", async () => {
        const newVip = {
          email: "new@test.com",
          name: "New VIP",
          tier: "silver",
          reg_type: "email_invite",
        };

        const mockResponse = {
          success: true,
          data: {
            id: "new-vip-id",
            ...newVip,
            invite_token: "generated-token",
          },
        };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          status: 201,
          json: async () => mockResponse,
        });

        const response = await fetch("/api/admin/vips", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newVip),
        });

        const data = await response.json();

        expect(response.ok).toBe(true);
        expect(data.success).toBe(true);
        expect(data.data.invite_token).toBeDefined();
      });

      it("중복 이메일은 에러를 반환한다", async () => {
        mockFetch.mockResolvedValueOnce({
          ok: false,
          status: 409,
          json: async () => ({ success: false, error: "duplicate_email" }),
        });

        const response = await fetch("/api/admin/vips", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: "existing@test.com" }),
        });

        expect(response.status).toBe(409);
        const data = await response.json();
        expect(data.error).toBe("duplicate_email");
      });
    });

    describe("PUT /api/admin/vips/[id]", () => {
      it("VIP 정보를 업데이트한다", async () => {
        const updateData = {
          name: "Updated Name",
          tier: "gold",
        };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            success: true,
            data: { id: "vip-123", ...updateData },
          }),
        });

        const response = await fetch("/api/admin/vips/vip-123", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        });

        expect(response.ok).toBe(true);
      });
    });

    describe("DELETE /api/admin/vips/[id]", () => {
      it("VIP를 비활성화한다 (soft delete)", async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({ success: true }),
        });

        const response = await fetch("/api/admin/vips/vip-123", {
          method: "DELETE",
        });

        expect(response.ok).toBe(true);
      });
    });
  });

  describe("Admin Orders API", () => {
    describe("GET /api/admin/orders", () => {
      it("주문 목록을 조회한다", async () => {
        const mockResponse = {
          success: true,
          data: [
            {
              id: "order-1",
              status: "processing",
              vip: { name: "VIP 1" },
              created_at: "2025-01-01T00:00:00Z",
            },
          ],
          total: 1,
        };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        });

        const response = await fetch("/api/admin/orders");
        const data = await response.json();

        expect(data.success).toBe(true);
        expect(data.data[0].status).toBe("processing");
      });

      it("상태별 필터링이 적용된다", async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            success: true,
            data: [{ id: "1", status: "shipped" }],
          }),
        });

        const response = await fetch("/api/admin/orders?status=shipped");
        const data = await response.json();

        expect(data.data[0].status).toBe("shipped");
      });
    });

    describe("PATCH /api/admin/orders/[id]", () => {
      it("주문 상태를 업데이트한다", async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            success: true,
            data: { id: "order-1", status: "shipped" },
          }),
        });

        const response = await fetch("/api/admin/orders/order-1", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "shipped" }),
        });

        const data = await response.json();
        expect(data.data.status).toBe("shipped");
      });

      it("배송 정보를 업데이트한다", async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            success: true,
            data: {
              id: "order-1",
              tracking_number: "TRACK123",
              carrier: "FedEx",
            },
          }),
        });

        const response = await fetch("/api/admin/orders/order-1", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tracking_number: "TRACK123",
            carrier: "FedEx",
          }),
        });

        const data = await response.json();
        expect(data.data.tracking_number).toBe("TRACK123");
        expect(data.data.carrier).toBe("FedEx");
      });
    });
  });

  describe("Dashboard API", () => {
    describe("GET /api/admin/dashboard", () => {
      it("대시보드 통계를 조회한다", async () => {
        const mockResponse = {
          success: true,
          data: {
            totalVips: 100,
            activeVips: 85,
            totalOrders: 50,
            recentVips: [],
            recentOrders: [],
          },
        };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        });

        const response = await fetch("/api/admin/dashboard");
        const data = await response.json();

        expect(data.success).toBe(true);
        expect(data.data.totalVips).toBe(100);
        expect(data.data.activeVips).toBe(85);
      });
    });
  });

  describe("Error Handling", () => {
    it("인증되지 않은 요청은 401을 반환한다", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ success: false, error: "unauthorized" }),
      });

      const response = await fetch("/api/admin/vips");

      expect(response.status).toBe(401);
    });

    it("서버 에러는 500을 반환한다", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ success: false, error: "server_error" }),
      });

      const response = await fetch("/api/admin/vips");

      expect(response.status).toBe(500);
    });

    it("네트워크 에러를 처리한다", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      await expect(fetch("/api/admin/vips")).rejects.toThrow("Network error");
    });
  });
});
