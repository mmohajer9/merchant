import routes from '../../common/routes';
import axiosInstance from '../../common/axios';
import { homeActions } from '.';

export const fetchProductsAction = ({
  limit = undefined,
  offset = undefined,
  history,
}) => {
  return async (dispatch) => {
    const path = routes.api.productList.path;
    try {
      const { data } = await axiosInstance.get(path, {
        params: { limit, offset },
      });
      await dispatch(
        homeActions.setCarouselItems({
          results: data.results,
          next: data.next,
          previous: data.previous,
          count: data.count,
        })
      );
    } catch (error) {}
  };
};

export default fetchProductsAction;
