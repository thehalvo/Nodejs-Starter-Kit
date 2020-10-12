import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { Row, Col, Icon, Divider } from 'antd';

import { PageLayout, Spin, Heading, MetaTags } from '@gqlapp/look-client-react';

// import ROUTES from '../routes';
import settings from '@gqlapp/config';
import OrderFilterComponent from './OrderFilterComponent.web';
import OrderListComponent from './OrderListComponent.web';

const OrderView = props => {
  const { t, load } = props;

  return (
    <PageLayout>
      <MetaTags title={t('title')} description={`${settings.app.name} - ${'meta'}`} />

      <Row>
        <Col span={12}>
          <Heading type="2">
            <Icon type="solution" /> &nbsp;
            {t('list.subTitle')}
          </Heading>
        </Col>
        <Col span={12} align="right">
          {/* <Link to={ROUTES.add}>
            <Button color="primary">{t('list.btn.add')}</Button>
          </Link> */}
        </Col>
      </Row>
      <br />
      <hr />
      <br />
      <OrderFilterComponent {...props} />
      <Divider />
      <hr />
      {!load ? (
        <OrderListComponent {...props} />
      ) : (
        <div align="center">
          <br />
          <br />
          <br />
          <Spin size="large" />
        </div>
      )}
    </PageLayout>
  );
};

OrderView.propTypes = {
  t: PropTypes.func,
  load: PropTypes.bool
};

export default OrderView;
