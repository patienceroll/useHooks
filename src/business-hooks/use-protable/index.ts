import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { isEqual } from 'lodash';

import type { ProTableProps } from '@ant-design/pro-table';
import type { TablePaginationConfig, TableProps } from 'antd';

import type { BaseResponse, BaseListParams, List } from './data';

export default function useProTable<T = Record<string | number, unknown>, Addtion = undefined>(
  api: (
    params: Record<string | number, unknown> & BaseListParams,
  ) => Promise<BaseResponse<List<T, Addtion>>>,
  options: {
    /** ### 扩展参数
     * - 列表请求参数大部分为表单,如果需要单独传递其他参数,可以使用 extraParams
     * - extraParams 参数的优先级比表单搜索参数优先级高
     */
    extraParams?: Record<string | number, any>;
    /** ### 第一次调用 hook 的时候,是否去请求数据,默认 true */
    initLoad?: boolean;
    /** ### 当表单点击重置的时候,如果ProTable 的form属性有 initialValues 属性,那么请求参数需要和表格表现一致,所以此处传入相同的属性  */
    initialValues?: NonNullable<
      ProTableProps<T, Parameters<typeof api>[0]>['form']
    >['initialValues'];
  } = {},
) {
  const { extraParams = {}, initLoad = true, initialValues = {} } = options;

  /** ### 在hooks内部保存复杂对象,用来对比新旧数据是否有变更 */
  const Temp = useRef<Record<'options.extraParam' | 'options.initialValues', Record<string, any>>>({
    'options.extraParam': extraParams,
    'options.initialValues': initialValues,
  });

  /** 列表的 response,如果需要列表里面有其他参数可以从此获取 */
  const listReponse = useRef<BaseResponse<List<T, Addtion>>>();

  /** ### 列表的请求参数,会按照优先级来合并成最终请求的参数,优先级如下
   * 1. extraParams
   * 2. Protable组件搜索表单的值
   * 3. 分页参数(page,size等意义的参数)
   */
  const Params = useRef<Parameters<typeof api>[0]>({
    current: 1,
    pageSize: 10,
    ...initialValues,
    ...extraParams,
  });

  /** ProTable 的 Pagination 属性  */
  const Pagination = useRef<TablePaginationConfig>({
    pageSize: 10,
    total: 0,
  });

  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSourse] = useState<T[]>([]);

  /** 请求数据 */
  const getList = useCallback(
    function () {
      setLoading(true);
      api(Params.current)
        .then((res) => {
          listReponse.current = res;
          const { data, current, total } = res.data;
          setDataSourse(data);
          Params.current.current = current;
          Pagination.current.current = current;
          Pagination.current.total = total;
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [api],
  );

  const tableOptions: ProTableProps<T, Parameters<typeof api>[0]>['options'] = useMemo(
    () => ({
      reload: getList,
    }),
    [getList],
  );

  /** 表格onChange */
  const onChange = useCallback<NonNullable<TableProps<T>['onChange']>>(
    (pagination, filters) => {
      Params.current.page = pagination.current || 1;
      Params.current.size = pagination.pageSize || 10;
      Pagination.current = pagination;
      Object.keys(filters).forEach((key) => {
        if (Array.isArray(filters[key])) Params.current[key] = filters[key];
        else Params.current[key] = undefined;
      });
      getList();
    },
    [getList],
  );

  /** ProTable 表单点击查询(提交)时触发 */
  const onSubmit = useCallback<
    NonNullable<
      ProTableProps<T, Omit<Parameters<typeof api>[0], 'pageSize' | 'current'>>['onSubmit']
    >
  >(
    (params) => {
      const { pageSize, current } = Params.current;
      Params.current = {
        pageSize,
        current,
        ...params,
        // 保证 extraParam 的优先级比form的优先级高
        ...Temp.current['options.extraParam'],
      };
      getList();
    },
    [getList],
  );

  /**  ProTable 表单点重置时触发 */
  const onReset = useCallback(() => {
    Params.current = {
      pageSize: Params.current.pageSize,
      current: Params.current.current,
      ...Temp.current['options.initialValues'],
      ...Temp.current['options.extraParam'],
    };
    getList();
  }, [getList]);

  /** 判断 extraParams 是否变化  */
  useEffect(() => {
    if (!isEqual(extraParams, Temp.current['options.extraParam'])) {
      Temp.current['options.extraParam'] = extraParams;
      Params.current = { ...Params.current, ...extraParams };
      getList();
    }
  }, [extraParams, getList]);

  /** 判断 initialValues 是否变化
   * - 这里主要是防止 initialValues 对象地址变化引起一些列的问题,所以把 initialValues 转换成固定地址
   * - 但是在 initialValues 有值的变化,且其他状态变化引起更新之后调用getList,会采用新的 initialValues
   */
  useEffect(() => {
    if (!isEqual(initialValues, Temp.current['options.initialValues'])) {
      Temp.current['options.initialValues'] = initialValues;
    }
  }, [initialValues]);

  useEffect(() => {
    if (initLoad) {
      getList();
    }
  }, [getList, initLoad]);

  return {
    loading,
    dataSource,
    pagination: Pagination.current,
    onChange,
    onSubmit,
    reload: getList,
    onReset,
    options: tableOptions,
    listReponse: listReponse.current,
  };
}
