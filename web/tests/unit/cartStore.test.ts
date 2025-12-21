import { describe, it, expect, beforeEach, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";

// localStorage mock
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

// cartStore import는 localStorage mock 이후에 수행
import { useCartStore, type CartItem } from "@/stores/cartStore";

describe("cartStore", () => {
  const mockProduct: CartItem = {
    productId: "product-1",
    productName: "Test Product",
    category: "Outerwear",
    size: "M",
    image: "/test-image.jpg",
  };

  const mockProduct2: CartItem = {
    productId: "product-2",
    productName: "Test Product 2",
    category: "Accessories",
    size: "L",
    image: "/test-image-2.jpg",
  };

  beforeEach(() => {
    // 각 테스트 전 스토어 초기화
    const { result } = renderHook(() => useCartStore());
    act(() => {
      result.current.clearCart();
      result.current.setVipInfo(5, "Gold"); // 기본값으로 초기화
    });
    localStorageMock.clear();
  });

  describe("addItem", () => {
    it("장바구니에 상품을 추가한다", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockProduct);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0]).toEqual(mockProduct);
    });

    it("동일한 상품을 추가하면 사이즈가 업데이트된다", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockProduct);
      });

      const updatedProduct = { ...mockProduct, size: "L" };

      act(() => {
        result.current.addItem(updatedProduct);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].size).toBe("L");
    });

    it("maxItems 제한을 초과하면 추가되지 않는다", () => {
      const { result } = renderHook(() => useCartStore());

      // Gold VIP (5개 제한)
      act(() => {
        result.current.setVipInfo(5, "Gold");
      });

      // 5개 추가
      for (let i = 0; i < 5; i++) {
        act(() => {
          result.current.addItem({
            ...mockProduct,
            productId: `product-${i}`,
          });
        });
      }

      expect(result.current.items).toHaveLength(5);

      // 6번째 추가 시도
      act(() => {
        result.current.addItem({
          ...mockProduct,
          productId: "product-6",
        });
      });

      expect(result.current.items).toHaveLength(5);
    });

    it("Silver VIP는 3개 제한이 적용된다", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.setVipInfo(3, "Silver");
      });

      // 3개 추가
      for (let i = 0; i < 3; i++) {
        act(() => {
          result.current.addItem({
            ...mockProduct,
            productId: `product-${i}`,
          });
        });
      }

      expect(result.current.items).toHaveLength(3);

      // 4번째 추가 시도
      act(() => {
        result.current.addItem({
          ...mockProduct,
          productId: "product-4",
        });
      });

      expect(result.current.items).toHaveLength(3);
    });
  });

  describe("removeItem", () => {
    it("상품을 장바구니에서 제거한다", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockProduct);
        result.current.addItem(mockProduct2);
      });

      expect(result.current.items).toHaveLength(2);

      act(() => {
        result.current.removeItem(mockProduct.productId);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].productId).toBe(mockProduct2.productId);
    });

    it("존재하지 않는 상품 ID로 제거해도 에러가 발생하지 않는다", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockProduct);
      });

      act(() => {
        result.current.removeItem("non-existent-id");
      });

      expect(result.current.items).toHaveLength(1);
    });
  });

  describe("updateItemSize", () => {
    it("상품의 사이즈를 업데이트한다", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockProduct);
      });

      act(() => {
        result.current.updateItemSize(mockProduct.productId, "XL");
      });

      expect(result.current.items[0].size).toBe("XL");
    });

    it("존재하지 않는 상품의 사이즈를 업데이트해도 에러가 발생하지 않는다", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockProduct);
      });

      act(() => {
        result.current.updateItemSize("non-existent-id", "XL");
      });

      expect(result.current.items[0].size).toBe("M");
    });
  });

  describe("clearCart", () => {
    it("장바구니를 비운다", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockProduct);
        result.current.addItem(mockProduct2);
      });

      expect(result.current.items).toHaveLength(2);

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.items).toHaveLength(0);
    });
  });

  describe("setVipInfo", () => {
    it("VIP 정보를 설정한다", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.setVipInfo(3, "Silver");
      });

      expect(result.current.maxItems).toBe(3);
      expect(result.current.tierName).toBe("Silver");
    });
  });

  describe("isInCart", () => {
    it("장바구니에 상품이 있으면 true를 반환한다", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockProduct);
      });

      expect(result.current.isInCart(mockProduct.productId)).toBe(true);
    });

    it("장바구니에 상품이 없으면 false를 반환한다", () => {
      const { result } = renderHook(() => useCartStore());

      expect(result.current.isInCart("non-existent-id")).toBe(false);
    });
  });

  describe("getItemSize", () => {
    it("장바구니에 있는 상품의 사이즈를 반환한다", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockProduct);
      });

      expect(result.current.getItemSize(mockProduct.productId)).toBe("M");
    });

    it("장바구니에 없는 상품은 null을 반환한다", () => {
      const { result } = renderHook(() => useCartStore());

      expect(result.current.getItemSize("non-existent-id")).toBeNull();
    });
  });

  describe("canAddMore", () => {
    it("maxItems 미만이면 true를 반환한다", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.setVipInfo(5, "Gold");
      });

      expect(result.current.canAddMore()).toBe(true);

      act(() => {
        result.current.addItem(mockProduct);
      });

      expect(result.current.canAddMore()).toBe(true);
    });

    it("maxItems에 도달하면 false를 반환한다", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.setVipInfo(2, "Test");
      });

      act(() => {
        result.current.addItem(mockProduct);
        result.current.addItem(mockProduct2);
      });

      expect(result.current.canAddMore()).toBe(false);
    });
  });
});
