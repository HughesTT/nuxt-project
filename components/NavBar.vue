<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Logo / Brand -->
      <div class="navbar-brand">
        <NuxtLink to="/" class="brand-link">
          <span class="brand-name">TechShop</span>
        </NuxtLink>
      </div>

      <!-- Desktop Navigation -->
      <div class="navbar-menu" :class="{ 'is-active': isMenuOpen }">
        <!-- 產品 Links -->
        <ul class="nav-links">
          <li>
            <NuxtLink to="/">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/products/headphone">耳機</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/products/speaker">喇叭</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/products/TV">電視</NuxtLink>
          </li>
        </ul>

        <!-- Search Bar -->
        <div class="search-box">
          <input type="text" v-model="searchQuery" placeholder="搜尋商品..." class="search-input"
            @keyup.enter="handleSearch" />
          <button @click="handleSearch" class="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </div>

        <!-- 簡單會員功能展示，無登入 -->
        <ul class="nav-actions">
          <li class="action-item member-dropdown" title="會員中心">
            <button @click="toggleMemberMenu" class="member-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span class="badge" v-if="cart.length > 0">{{ cart.length }}</span>
            </button>

            <!-- Dropdown Menu -->
            <div class="dropdown-menu" :class="{ 'is-active': isMemberMenuOpen }">
              <NuxtLink to="/member/memberinfo" class="dropdown-item">
                <span>會員資訊</span>
              </NuxtLink>

              <NuxtLink to="/member/wishlist" class="dropdown-item">
                <span>追蹤商品</span>
              </NuxtLink>

              <NuxtLink to="/member/cart" class="dropdown-item">
                <span>購物車</span>
                <span class="item-badge" v-if="cart.length > 0">{{ cart.length }}</span>
              </NuxtLink>

              <NuxtLink to="/member/orders" class="dropdown-item">
                <span>訂單資訊</span>
              </NuxtLink>

              <div class="dropdown-divider"></div>

              <NuxtLink to="" class="dropdown-item login-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                  <polyline points="10 17 15 12 10 7"></polyline>
                  <line x1="15" y1="12" x2="3" y2="12"></line>
                </svg>
                <span>會員登入</span>
              </NuxtLink>
            </div>
          </li>
        </ul>
      </div>

      <!-- Mobile Menu Toggle -->
      <button class="navbar-burger" @click="toggleMenu" :class="{ 'is-active': isMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useCart } from '~/composable/useCart'

const isMenuOpen = ref(false)
const isMemberMenuOpen = ref(false)
const searchQuery = ref('')
const carts = useCart()
const { cart } = storeToRefs(carts)
const { getCart } = carts

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  isMemberMenuOpen.value = false // 關閉會員選單
}

const toggleMemberMenu = () => {
  isMemberMenuOpen.value = !isMemberMenuOpen.value
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // 導向至搜尋結果頁
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`)
  }
}

// 關閉選單當路由改變時
watch(
  () => useRoute().path, () => {
    isMenuOpen.value = false
    isMemberMenuOpen.value = false
  }
)

// 點擊外部關閉會員選單
onMounted(() => {
  if (process.client) {
    document.addEventListener('click', (e) => {
      const memberDropdown = document.querySelector('.member-dropdown')
      if (memberDropdown && !memberDropdown.contains(e.target)) {
        isMemberMenuOpen.value = false
      }
    })
  }
  getCart() // 初始化購物車資料
})
</script>

<style lang="scss" scoped>
.navbar {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;

  .navbar-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
  }

  // Logo/Brand
  .navbar-brand {
    flex-shrink: 0;

    .brand-link {
      text-decoration: none;

      .brand-name {
        font-size: 1.5rem;
        font-weight: bold;
        color: #2c4894;
        letter-spacing: 1px;
      }
    }
  }

  // Desktop Menu
  .navbar-menu {
    display: flex;
    align-items: center;
    gap: 2rem;
    flex: 1;
    margin-left: 3rem;

    .nav-links {
      display: flex;
      list-style: none;
      gap: 1.5rem;
      margin: 0;
      padding: 0;

      li {
        a {
          color: #666;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 500;
          padding: 0.5rem 0.75rem;
          transition: all 0.6s ease;

          &:hover {
            border-bottom: 2px solid rgba(0, 0, 0, 0.1);
          }

          &.router-link-active {
            border-bottom: 2px solid rgba(0, 0, 0, 0.2);
          }
        }
      }
    }

    // Search Box
    .search-box {
      display: flex;
      align-items: center;
      background: rgba(200, 200, 200, 0.2);
      border-radius: 25px;
      overflow: hidden;
      max-width: 300px;
      flex: 1;

      .search-input {
        flex: 1;
        border: none;
        background: transparent;
        padding: 0.6rem 1rem;
        color: #1e3470;
        font-size: 0.95rem;
        outline: none;

        &::placeholder {
          color: rgba(102, 102, 102, 0.7);
        }
      }

      .search-button {
        background: transparent;
        border: none;
        color: #666;
        padding: 0.5rem 1rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        transition: opacity 0.3s;

        &:hover {
          opacity: 0.8;
        }
      }
    }

    // Member Actions
    .nav-actions {
      display: flex;
      list-style: none;
      gap: 1rem;
      margin: 0;
      padding: 0;
      margin-left: auto;

      .action-item {
        position: relative;

        &.member-dropdown {
          .member-button {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.25rem;
            color: #666;
            background: rgba(200, 200, 200, 0.2);
            border: none;
            padding: 0.5rem 0.75rem;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;

            &:hover {
              background-color: rgba(0, 0, 0, 0.3);
            }

            svg {
              display: block;
            }

            .action-label {
              font-size: 0.75rem;
              white-space: nowrap;
            }

            .badge {
              position: absolute;
              top: -5px;
              right: -5px;
              background-color: #ff4757;
              color: white;
              font-size: 0.7rem;
              font-weight: bold;
              padding: 0.15rem 0.4rem;
              border-radius: 10px;
              min-width: 18px;
              text-align: center;
            }
          }

          // Dropdown Menu
          .dropdown-menu {
            position: absolute;
            top: calc(100% + 0.5rem);
            right: 0;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            min-width: 170px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            z-index: 100;

            &.is-active {
              opacity: 1;
              visibility: visible;
              transform: translateY(0);
            }

            &::before {
              content: '';
              position: absolute;
              top: -6px;
              right: 20px;
              width: 12px;
              height: 12px;
              background: white;
              transform: rotate(45deg);
            }

            .dropdown-item {
              display: flex;
              align-items: center;
              gap: 0.75rem;
              padding: 0.85rem 1.25rem;
              color: #333;
              text-decoration: none;
              transition: background-color 0.2s;
              position: relative;

              &:first-child {
                border-radius: 8px 8px 0 0;
                padding-top: 1rem;
              }

              &:last-child {
                border-radius: 0 0 8px 8px;
                padding-bottom: 1rem;
              }

              svg {
                flex-shrink: 0;
                color: #666;
              }

              span {
                flex: 1;
                font-size: 0.95rem;
              }

              .item-badge {
                flex: 0;
                background-color: #ff4757;
                color: white;
                font-size: 0.7rem;
                font-weight: bold;
                padding: 0.15rem 0.5rem;
                border-radius: 10px;
                min-width: 20px;
                text-align: center;
              }

              &:hover {
                background-color: #f5f5f5;
              }

              &.router-link-active {
                background-color: #e8f4ff;
                color: #2c4894;

                svg {
                  color: #2c4894;
                }
              }

              &.login-item {
                background-color: #2c4894;
                color: white;
                font-weight: 500;

                svg {
                  color: white;
                }

                &:hover {
                  background-color: #1e3470;
                }
              }
            }

            .dropdown-divider {
              height: 1px;
              background-color: #e0e0e0;
              margin: 0.5rem 0;
            }
          }
        }
      }
    }
  }

  // Mobile Menu Toggle
  .navbar-burger {
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 25px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 10;

    span {
      width: 100%;
      height: 3px;
      background-color: #1e3470;
      border-radius: 10px;
      transition: all 0.3s ease;
      transform-origin: center;
    }

    &.is-active {
      span:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
      }

      span:nth-child(2) {
        opacity: 0;
      }

      span:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
      }
    }
  }
}

// Tablet & Mobile Responsive
@media (max-width: 1024px) {
  .navbar {
    .navbar-container {
      height: 60px;
    }

    .navbar-menu {
      margin-left: 1.5rem;
      gap: 1rem;

      .nav-links {
        gap: 1rem;

        li a {
          font-size: 0.9rem;
          padding: 0.4rem 0.6rem;
        }
      }

      .search-box {
        max-width: 200px;
      }

      .nav-actions {
        gap: 0.5rem;

        .action-item.member-dropdown {
          .member-button {
            padding: 0.4rem 0.6rem;

            .action-label {
              display: block;
              font-size: 0.7rem;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .navbar {
    .navbar-burger {
      display: flex;
    }

    .navbar-menu {
      position: fixed;
      top: 60px;
      left: 0;
      right: 0;
      background-color: #2c4894;
      flex-direction: column;
      align-items: stretch;
      gap: 0;
      margin: 0;
      padding: 1rem;
      max-height: 0;
      overflow: hidden;
      opacity: 0;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

      &.is-active {
        max-height: calc(100vh - 60px);
        opacity: 1;
        overflow-y: auto;
      }

      .nav-links {
        flex-direction: column;
        gap: 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        margin-bottom: 1rem;
        padding-bottom: 1rem;

        li a {
          color: white;
          display: block;
          padding: 1rem;
          font-size: 1rem;

          &:hover {
            background-color: rgba(255, 255, 255, 0.1);
          }
        }
      }

      .search-box {
        max-width: 100%;
        margin-bottom: 1rem;
        border-radius: 8px;
        background: #fff;

        .search-input {
          padding: 0.8rem 1rem;
        }
      }

      .nav-actions {
        background: #fff;
        flex-direction: column;
        gap: 0;
        margin: 0;
        border-radius: 8px;

        .action-item.member-dropdown {
          .member-button {
            width: 100%;
            flex-direction: row;
            justify-content: center;
            gap: 0.75rem;
            padding: 1rem;
            border-radius: 8px;

            .action-label {
              font-size: 1rem;
            }
          }

          .dropdown-menu {
            position: static;
            box-shadow: none;
            background: transparent;
            opacity: 1;
            visibility: visible;
            transform: none;
            margin-top: 0.5rem;

            &::before {
              display: none;
            }

            &:not(.is-active) {
              display: none;
            }

            .dropdown-item {
              background: rgba(255, 255, 255, 0.1);
              // color: white;
              margin-bottom: 0.5rem;
              border-radius: 8px;
              padding: 1rem 1.25rem;

              &:first-child,
              &:last-child {
                border-radius: 8px;
                padding: 1rem 1.25rem;
              }

              svg {
                color: white;
              }

              &:hover {
                background: rgba(255, 255, 255, 0.15);
              }

              &.router-link-active {
                background-color: rgba(255, 255, 255, 0.2);
                color: white;

                svg {
                  color: white;
                }
              }

              &.login-item {
                background-color: rgba(255, 255, 255, 0.25);
                margin-top: 0.5rem;

                &:hover {
                  background-color: rgba(255, 255, 255, 0.35);
                }
              }
            }

            .dropdown-divider {
              display: none;
            }
          }
        }
      }
    }
  }
}
</style>
