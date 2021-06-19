import routes from '../../common/routes';
import { homeActions } from '.';
import getAxiosInstance from '../../common/axios';
const axios = getAxiosInstance();

const getProducts = ({
  limit = undefined,
  offset = undefined,
  history,
}) => {
  return async (dispatch) => {
    const path = routes.api.productList.path;
    try {
      const { data } = await axios.get(path, {
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

export default getProducts;
