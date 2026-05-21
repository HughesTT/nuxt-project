/**
 * 產品類型配置介面
 */
export interface ProductTypeConfig {
  displayName: string
  description: string
  seoTitle: string
  color?: string // 可選：主題顏色
  bgColor?: string // 可選：背景顏色
}

/**
 * 產品類型配置資料
 * 集中管理所有產品類型的顯示資訊
 */
const productTypeConfig: Record<string, ProductTypeConfig> = {
  headphone: {
    displayName: '耳機',
    description: '高品質音響體驗',
    seoTitle: '耳機專區 - 探索頂級音質',
    color: '#2c4894',
    bgColor: '#e3f2fd'
  },
  speaker: {
    displayName: '揚聲器',
    description: '震撼音質享受',
    seoTitle: '揚聲器專區 - 感受聲音魅力',
    color: '#1976d2',
    bgColor: '#e1f5fe'
  },
  TV: {
    displayName: '電視',
    description: '極致視覺饗宴',
    seoTitle: '電視專區 - 視聽新體驗',
    color: '#0d47a1',
    bgColor: '#e8eaf6'
  }
  // 未來新增商品類型可在此延續添加
}

/**
 * 預設產品類型配置
 * 當找不到對應配置時使用
 */
const defaultProductTypeConfig: ProductTypeConfig = {
  displayName: '產品',
  description: '優質商品選擇',
  seoTitle: '產品專區',
  color: '#666666',
  bgColor: '#f5f5f5'
}

/**
 * 產品類型管理 Composable
 * 提供產品類型配置的查詢和管理功能
 */
export const useProductType = () => {
  /**
   * 取得指定產品類型的配置
   * @param unit 產品類型 ID（如：headphone, speaker, TV）
   * @returns 產品類型配置物件
   */
  const getProductTypeConfig = (unit: string): ProductTypeConfig => {
    return productTypeConfig[unit] || {
      ...defaultProductTypeConfig,
      displayName: unit,
      seoTitle: `${unit} - 產品列表`
    }
  }

  /**
   * 取得所有產品類型配置
   * @returns 完整的產品類型配置物件
   */
  const getAllProductTypes = (): Record<string, ProductTypeConfig> => {
    return productTypeConfig
  }

  /**
   * 取得所有產品類型的 ID 列表
   * @returns 產品類型 ID 陣列
   */
  const getProductTypeIds = (): string[] => {
    return Object.keys(productTypeConfig)
  }

  /**
   * 檢查產品類型是否存在
   * @param unit 產品類型 ID
   * @returns 是否存在
   */
  const hasProductType = (unit: string): boolean => {
    return unit in productTypeConfig
  }

  return {
    getProductTypeConfig,
    getAllProductTypes,
    getProductTypeIds,
    hasProductType
  }
}