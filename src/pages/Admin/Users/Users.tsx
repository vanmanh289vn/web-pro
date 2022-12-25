import React, { ChangeEvent, Fragment, useEffect, useState  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../../store'
import { deleteUsers, loadUsersPaging } from '../../../store/users/actions'
import { IUser } from '../../../store/users/types'
import { Pagination } from '../../../components'
import { Link } from 'react-router-dom'
import { UrlConstants } from '../../../constants'
import swal from 'sweetalert'
// import Pagination from '@material-ui/lab/Pagination'

export const Users = () => {

    const users: IUser[] = useSelector((state: AppState) => state.users.items);

    const totalItems = useSelector((state: AppState) => state.users.total);
    // const pageSize = useSelector((state: AppState) => state.users.pageSize);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const [pageSize, setPageSize] = useState(6);

    const pageSizes = [3, 6, 9];
    // const [pageSizes, setPageSizes] = useState([3, 6, 9]);


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUsersPaging(currentPage, searchKeyword, pageSize));
    }, [dispatch, currentPage, searchKeyword, pageSize]);

    const onPageChanged = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        dispatch(loadUsersPaging(pageNumber, searchKeyword, pageSize));
    };

    // const handlePageChange = (event: ChangeEvent<any>, value: number) => {
    //     setCurrentPage(value);
    //     dispatch(loadUsersPaging(currentPage, searchKeyword, pageSize));
    // };

    const handleKeywordPress = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
    }

    const clearSearch = () => {
        setSearchKeyword('');
        dispatch(loadUsersPaging(1, '', pageSize));
    }

    const handleSelectRow = (id: string) => {
        let newSelectedItems = [...selectedItems];
        selectedItems.indexOf(id) !== -1 
        ? (newSelectedItems = selectedItems.filter((item) => item !== id))
        : newSelectedItems.push(id);

        setSelectedItems(newSelectedItems);
    };

    const handleDelete = () => {
        if(selectedItems) {
            swal({
                title: 'Xác nhận',
                text: 'Bạn có muốn xóa các bản ghi này?',
                icon: 'warning',
                buttons: ['Hủy', 'Xác nhận'],
                dangerMode: true,
            }).then((willDelete) => {
                if(willDelete){
                    dispatch(deleteUsers(selectedItems));
                    setSelectedItems([]);
                }
            });
        }
    };

    const handlePageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        let size: any = e.target.value;
        setPageSize(size as number);
        setCurrentPage(1);
        console.log('pageSize : ');
        console.log(pageSize);
        // dispatch(loadUsersPaging(1, '', pageSize));
    }

    const userElements: JSX.Element[] = users.map((user) => {
        return (
            <tr key={`user_${user.id}`}
                className={`table-row ${
                    selectedItems.indexOf(user.id) !== -1 ? 'selected' : ''
                }`}
                onClick={() => handleSelectRow(user.id)}
                >
                <td>
                    <input 
                        type='checkbox'
                        value={`${user.id}`}
                        onChange={() => handleSelectRow(user.id)}
                        checked={selectedItems.indexOf(user.id) !== -1}
                    />
                </td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td><Link to={UrlConstants.USER_EDIT + user.id}>Sửa</Link></td>
            </tr>
        );
    });

  return (
    <Fragment>
        <div>
        <h1 className="h3 mb-2 text-gray-800">Danh sách người dùng</h1>
        {showSearch && (
            <div className='row mb-3'>
                <div className='col-xl-12 col-md-12 mb-12'>
                    <div className='card'>
                        <h5 className='card-header'>Tìm kiếm</h5>
                        <div className='header-buttons'>
                            <button
                                className='btn btn-outline-warning btn-sm'
                                onClick={() => setShowSearch(false)}
                            >
                                Đóng
                                <span className='fa fa-times'></span>
                            </button>
                        </div>
                        <div className='card-body'>
                            <form className='form-inline'>
                                <div className='col-auto'>
                                    <input
                                        type='text'
                                        value={searchKeyword}
                                        onChange={handleKeywordPress}
                                        className='form-control'
                                        placeholder='Tìm kiếm theo email..'
                                    ></input>
                                </div>
                                <button
                                    type='button'
                                    onClick={() => dispatch(loadUsersPaging(currentPage, searchKeyword, pageSize))}
                                    className='btn btn-primary my-1'
                                >
                                    Tìm kiếm
                                </button>
                                <button
                                    type='button'
                                    onClick={() => clearSearch()}
                                    className='btn btn-default my-1'
                                >
                                    Xóa
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )}
        <div className="card shadow mb-4">
            <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Danh sách người dùng</h6>
            </div>
            <div className='header-buttons'>
                <button
                    type='button'
                    className='btn btn-link'
                    onClick={() => setShowSearch(true)}
                >
                    Tìm kiếm
                </button>
                <Link
                    to={UrlConstants.USER_ADD}
                    className='btn btn-outline-success btn-sm'
                >
                    <span className='fa fa-plus'></span> Thêm mới
                </Link>
                {selectedItems.length > 0 && (
                    <Fragment>
                        <button
                            className='btn btn-outline-danger btn-sm'
                            onClick={handleDelete}
                        >
                            <span className='fa fa-trash'></span> Xóa
                        </button>
                        <button
                            className='btn btn-outline-primary btn-sm'
                            onClick={() => setSelectedItems([])}
                        >
                            <i className='fas fa-check'></i> Bỏ chọn
                        </button>
                    </Fragment>
                )}
            </div>
            <div className="card-body">
            <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                <thead>
                    <tr>
                    <th></th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {userElements}
                </tbody>
                </table>
            </div>
            </div>
            {/* <div className='card-footer'>
            <div className='footer-paging'>
                {"Items per Page: "}
                <select onChange={handlePageSizeChange}>
                        {pageSizes.map((size) => (
                        <option key={size} value={size}>
                        {size}
                        </option>
                    ))}
                </select>
                <Pagination
                    totalRecords={totalItems}
                    pageLimit={3}
                    pageSize={pageSize}
                    onPageChanged={onPageChanged}
                    ></Pagination>
            </div>
          </div> */}
        </div>
        <div className='row mb-12'>
            <div className='col-xl-12 col-md-12 mb-12'>
            <div className='select-paging'>
                <div className='select-size'>
                    {"Items per Page: "}
                    <select onChange={handlePageSizeChange} value={pageSize}>
                            {pageSizes.map((size) => (
                            <option key={size} value={size}>
                            {size}
                            </option>
                        ))}
                    </select>
                </div>
                
                <Pagination
                    totalRecords={totalItems}
                    pageLimit={3}
                    pageSize={pageSize}
                    onPageChanged={onPageChanged}
                    ></Pagination>
            </div>
            </div>
        </div>
        </div>

    </Fragment>
  )
}
