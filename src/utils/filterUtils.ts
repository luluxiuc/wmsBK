/**
 * 筛选和搜索功能的通用工具模块
 * 用于统一管理博客、项目、资源等页面的筛选逻辑
 */

/**
 * 筛选按钮样式配置
 */
export const FILTER_BUTTON_STYLES = {
  active: {
    add: ['bg-sky-400', 'text-cosmos-800', 'font-semibold', 'shadow-glow'],
    remove: ['bg-cosmos-700', 'text-star-200', 'font-medium', 'border', 'border-cosmos-600']
  },
  inactive: {
    add: ['bg-cosmos-700', 'text-star-200', 'font-medium', 'border', 'border-cosmos-600'],
    remove: ['bg-sky-400', 'text-cosmos-800', 'font-semibold', 'shadow-glow']
  }
} as const;

/**
 * 标签按钮样式配置
 */
export const TAG_BUTTON_STYLES = {
  active: {
    add: ['bg-sky-400/20', 'text-sky-400', 'border-sky-400/50'],
    remove: []
  },
  inactive: {
    add: [],
    remove: ['bg-sky-400/20', 'text-sky-400', 'border-sky-400/50']
  }
} as const;

/**
 * 筛选条件接口
 */
export interface FilterCondition {
  category?: string;
  tag?: string;
  search?: string;
}

/**
 * 元素数据接口
 */
export interface ElementData {
  category?: string;
  tags?: string;
  title?: string;
  description?: string;
  name?: string;
}

/**
 * 筛选配置接口
 */
export interface FilterConfig {
  elements: NodeListOf<Element>;
  elementSelector: string;
  emptyState?: HTMLElement | null;
  gridContainer?: HTMLElement | null;
  dataExtractor: (element: Element) => ElementData;
  conditionMatcher: (data: ElementData, condition: FilterCondition) => boolean;
}

/**
 * 更新按钮样式
 * @param button - 要更新样式的按钮元素
 * @param isActive - 是否激活状态
 * @param styles - 样式配置对象
 */
export function updateButtonStyle(
  button: HTMLElement,
  isActive: boolean,
  styles: typeof FILTER_BUTTON_STYLES.active | typeof TAG_BUTTON_STYLES.active
): void {
  const styleSet = isActive ? styles : { add: styles.remove, remove: styles.add };
  
  styleSet.remove.forEach(className => button.classList.remove(className));
  styleSet.add.forEach(className => button.classList.add(className));
}

/**
 * 重置按钮组样式
 * @param buttons - 按钮元素列表
 * @param styles - 样式配置对象
 */
export function resetButtonGroupStyles(
  buttons: NodeListOf<Element>,
  styles: typeof FILTER_BUTTON_STYLES.active | typeof TAG_BUTTON_STYLES.active
): void {
  buttons.forEach(btn => {
    updateButtonStyle(btn as HTMLElement, false, styles);
  });
}

/**
 * 执行筛选操作
 * @param config - 筛选配置
 * @param condition - 当前筛选条件
 * @returns 可见元素数量
 */
export function performFilter(config: FilterConfig, condition: FilterCondition): number {
  let visibleCount = 0;

  config.elements.forEach(element => {
    const data = config.dataExtractor(element);
    const isVisible = config.conditionMatcher(data, condition);

    if (isVisible) {
      element.classList.remove('hidden');
      visibleCount++;
    } else {
      element.classList.add('hidden');
    }
  });

  // 更新空状态显示
  if (config.emptyState && config.gridContainer) {
    if (visibleCount === 0) {
      config.emptyState.classList.remove('hidden');
      config.gridContainer.classList.add('hidden');
    } else {
      config.emptyState.classList.add('hidden');
      config.gridContainer.classList.remove('hidden');
    }
  }

  return visibleCount;
}

/**
 * 筛选管理器类
 * 用于管理筛选状态和执行筛选操作
 */
export class FilterManager {
  private condition: FilterCondition = {};
  private config: FilterConfig;

  constructor(config: FilterConfig) {
    this.config = config;
  }

  /**
   * 更新筛选条件并执行筛选
   * @param newCondition - 新的筛选条件
   */
  updateCondition(newCondition: Partial<FilterCondition>): void {
    this.condition = { ...this.condition, ...newCondition };
    performFilter(this.config, this.condition);
  }

  /**
   * 获取当前筛选条件
   * @returns 当前筛选条件的副本
   */
  getCondition(): FilterCondition {
    return { ...this.condition };
  }

  /**
   * 重置筛选条件
   */
  resetCondition(): void {
    this.condition = {};
    performFilter(this.config, this.condition);
  }
}

/**
 * 设置搜索输入监听器
 * @param searchInput - 搜索输入框元素
 * @param filterManager - 筛选管理器实例
 * @param debounceMs - 防抖延迟时间（毫秒）
 */
export function setupSearchListener(
  searchInput: HTMLInputElement | null,
  filterManager: FilterManager,
  debounceMs: number = 300
): void {
  if (!searchInput) return;

  let debounceTimer: number | undefined;

  searchInput.addEventListener('input', (e) => {
    const value = (e.target as HTMLInputElement).value;
    
    clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => {
      filterManager.updateCondition({ search: value });
    }, debounceMs);
  });
}

/**
 * 设置分类按钮监听器
 * @param buttons - 分类按钮元素列表
 * @param filterManager - 筛选管理器实例
 * @param onCategoryChange - 分类变化时的回调函数
 */
export function setupCategoryButtons(
  buttons: NodeListOf<Element>,
  filterManager: FilterManager,
  onCategoryChange?: (category: string) => void
): void {
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter') || btn.getAttribute('data-category') || 'all';
      
      // 重置所有按钮样式
      resetButtonGroupStyles(buttons, FILTER_BUTTON_STYLES.inactive);
      
      // 激活当前按钮
      updateButtonStyle(btn as HTMLElement, true, FILTER_BUTTON_STYLES.active);
      
      // 更新筛选条件
      filterManager.updateCondition({ 
        category: category === 'all' ? undefined : category,
        tag: undefined // 清除标签筛选
      });
      
      onCategoryChange?.(category);
    });
  });
}

/**
 * 设置标签按钮监听器
 * @param buttons - 标签按钮元素列表
 * @param filterManager - 筛选管理器实例
 * @param onTagChange - 标签变化时的回调函数
 */
export function setupTagButtons(
  buttons: NodeListOf<Element>,
  filterManager: FilterManager,
  onTagChange?: (tag: string | null) => void
): void {
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tag = btn.getAttribute('data-tag') || '';
      const currentCondition = filterManager.getCondition();
      
      if (currentCondition.tag === tag) {
        // 取消选择
        updateButtonStyle(btn as HTMLElement, false, TAG_BUTTON_STYLES.active);
        filterManager.updateCondition({ tag: undefined });
        onTagChange?.(null);
      } else {
        // 选择新标签
        resetButtonGroupStyles(buttons, TAG_BUTTON_STYLES.inactive);
        updateButtonStyle(btn as HTMLElement, true, TAG_BUTTON_STYLES.active);
        filterManager.updateCondition({ tag });
        onTagChange?.(tag);
      }
    });
  });
}
