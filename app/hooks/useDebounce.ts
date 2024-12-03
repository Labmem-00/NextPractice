import { useCallback, useRef } from 'react';

export function useDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const debouncedFunction = useCallback(
    (...args: Parameters<T>) => {
      // 如果定时器已经存在，先清除它
      if (timer.current) {
        clearTimeout(timer.current);
      }

      // 设置新的定时器
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay] // `callback` 和 `delay` 作为依赖，确保它们改变时更新防抖逻辑
  );

  return debouncedFunction;
}
