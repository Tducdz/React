import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";

const TableUserPaginate = (props) => {
  const { listUsers, pageCount } = props;
  const { t } = useTranslation();

  const handlePageClick = (event) => {
    props.fetchListUsersWithPaginate(+event.selected + 1);
    props.setCurrentPage(+event.selected + 1);
    console.log(`User requested page number ${event.selected}`);
  };

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">{t("tableUserPaginate.th1")}</th>
            <th scope="col">{t("tableUserPaginate.th2")}</th>
            <th scope="col">{t("tableUserPaginate.th3")}</th>
            <th scope="col">{t("tableUserPaginate.th4")}</th>
            <th scope="col">{t("tableUserPaginate.th5")}</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((user, index) => {
              return (
                <tr key={`table-users-${index}`}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => props.handleClickBtnView(user)}
                    >
                      {t("tableUserPaginate.btn1")}
                    </button>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => props.handleClickBtnEdit(user)}
                    >
                      {t("tableUserPaginate.btn2")}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => props.handleClickBtnDelete(user)}
                    >
                      {t("tableUserPaginate.btn3")}
                    </button>
                  </td>
                </tr>
              );
            })}

          {listUsers && listUsers.length === 0 && (
            <tr>
              <td colSpan={"5"} style={{ textAlign: "center" }}>
                {t("tableUserPaginate.text1")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="user-pagination d-flex justify-content-center">
        <ReactPaginate
          previousLabel={t("tableUserPaginate.paginate1")}
          nextLabel={t("tableUserPaginate.paginate2")}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={props.currentPage - 1}
        />
      </div>
    </>
  );
};

export default TableUserPaginate;
