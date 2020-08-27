/* eslint-disable react/display-name */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Popconfirm, Icon, message, Spin } from 'antd';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import { Table, Button, Pagination } from '@gqlapp/look-client-react';

import settings from '../../../../settings';
import { Reviews, Review, DeleteReview } from '../containers/Reviews.web';

const { itemsNumber, type } = settings.pagination.web;

const Loading = ({ t }: { t: TranslateFunction }) => <Spin text={t('review.loadMsg')} />;

const NoReviewsMessage = ({ t }: { t: TranslateFunction }) => (
  <div className="text-center">{t('review.noReviewsMsg')}</div>
);

const cancel = () => {
  message.error('Click on No');
};

export interface ReviewListComponentProps {
  loading: boolean;
  loadData: (cursor: number, action: string) => boolean;
  reviews: Reviews;
  orderBy: {
    column: string;
    order: string;
  };
  onOrderBy: ({ column, order }: { column: string; order: string }) => null;
  deleteReview: (input: DeleteReview) => boolean;
  t: TranslateFunction;
  history: object;
}

const ReviewListComponent: React.SFC<ReviewListComponentProps> = props => {
  const { orderBy, onOrderBy, loading, reviews, t, loadData, deleteReview } = props;

  const renderOrderByArrow = (name: string) => {
    if (orderBy && orderBy.column === name) {
      if (orderBy.order === 'desc') {
        return <span className="badge badge-primary">&#8595;</span>;
      } else {
        return <span className="badge badge-primary">&#8593;</span>;
      }
    } else {
      return <span className="badge badge-secondary">&#8645;</span>;
    }
  };
  const handleOrderBy = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, name: string) => {
    e.preventDefault();
    let order = 'asc';
    if (orderBy && orderBy.column === name) {
      if (orderBy.order === 'asc') {
        order = 'desc';
      } else if (orderBy.order === 'desc') {
        return onOrderBy({
          column: '',
          order: ''
        });
      }
    }
    return onOrderBy({ column: name, order });
  };

  const columns = [
    {
      title: (
        <a
          // onClick={e => handleOrderBy(e, "owner")}
          href="#"
        >
          {'Owner'}
          {/* {renderOrderByArrow("owner")} */}
        </a>
      ),
      dataIndex: 'owner',
      key: 'owner',
      render: (text: string, record: Review) => (
        <Link to={`/public-profile/${record && record.user && record.user.id}`}>
          {record && record.user && record.user.username}
        </Link>
      )
    },
    // {
    //   title: (
    //     <a
    //       // onClick={e => handleOrderBy(e, "baker")}
    //       href="#"
    //     >
    //       {'Reviewed baker'}
    //       {/* {renderOrderByArrow("baker")} */}
    //     </a>
    //   ),
    //   dataIndex: 'baker',
    //   key: 'baker',
    //   render: (text: string, record: Review) => (
    //     <Link to={`/baker/${record && record.userId}`}>{record && record.baker && record.baker.username}</Link>
    //   ),
    // },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'rating')} href="#">
          Rating {renderOrderByArrow('rating')}
        </a>
      ),
      dataIndex: 'rating',
      key: 'rating',
      render: (text: string) => <div>{text}</div>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'feedback')} href="#">
          Review {renderOrderByArrow('feedback')}
        </a>
      ),
      dataIndex: 'feedback',
      key: 'feedback',
      render: (text: string) => <div>{text}</div>
    },

    {
      title: t('list.column.actions'),
      key: 'actions',
      width: 200,
      render: (text: string, record: Review) => (
        <div>
          <Link className="review-link" to={`/edit/review/${record.id}`}>
            <Button color="primary" size="sm">
              Edit
            </Button>
          </Link>
          <Popconfirm
            title="Are you sure delete this review?"
            onConfirm={() => deleteReview({ modalId: null, reviewId: record.id, modal: '' })}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" shape="circle" size="sm">
              <Icon type="delete" />
            </Button>
          </Popconfirm>
        </div>
      )
    }
  ];

  const handlePageChange = (pagination: string, pageNumber: number) => {
    const {
      pageInfo: { endCursor }
    } = reviews;
    pagination === 'relay' ? loadData(endCursor + 1, 'add') : loadData((pageNumber - 1) * itemsNumber, 'replace');
  };

  const RenderReviews = () => (
    <Fragment>
      <Table dataSource={reviews.edges.map(({ node }: { node: Review }) => node)} columns={columns} />
      <Pagination
        itemsPerPage={reviews.edges.length}
        handlePageChange={handlePageChange}
        hasNextPage={reviews.pageInfo.hasNextPage}
        pagination={type}
        total={reviews.totalCount}
        loadMoreText={t('list.btn.more')}
        defaultPageSize={itemsNumber}
      />
    </Fragment>
  );

  return (
    <div>
      {/* Render loader */}
      {loading && !reviews && <Loading t={t} />}
      {/* Render main review content */}
      {reviews && reviews.totalCount ? <RenderReviews /> : <NoReviewsMessage t={t} />}
    </div>
  );
};

export default translate('review')(ReviewListComponent);
