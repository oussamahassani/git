import React, { useEffect, useState, useRef } from 'react';
import ReactPaginate from "react-paginate";
import { getAllAgent, deleteAgent } from "features/user/api/index"
import { toast, ToastContainer } from "react-toastify";

const Users = () => {
    const [rowsPerPage, setrowsPerPage] = useState([]);
    const [dateshow, setdateshow] = useState([]);
    const [filterval, setfilterval] = useState([]);
    const [pagelimit, setpagelimit] = useState(5);
    const [selected, setselected] = useState(0);
    const [offset, setoffset] = useState(0);
    const refmodal = useRef(null);
    const [rowsuprission, setrowsuprission] = useState("");

    useEffect(() => {


        getuserdata();


    }, [setrowsPerPage]);

    const deletecustomer = () => {
        refmodal.current.click();
        deleteAgent(rowsuprission.id)
            .then((res) => {
                console.log(res.status)
                getuserdata();
                toast.success("Client deleted");
            })
            .catch((err) => console.log(err));
    };
    const getuserdata = () => {
        getAllAgent()
            .then((res) => {
                console.log(res)
                if (res) {
                    setrowsPerPage(res);
                    const row = res;
                    const dat = row.slice(offset, pagelimit + offset);
                    if (Boolean(dat.length)) setdateshow(dat);
                    else {
                        const dat = row.slice(0, pagelimit);
                        setselected(0);
                        setdateshow(dat);
                    }
                } else setdateshow([]);
            })
            .catch((err) => console.log(err));
    }

    const onPageChanged = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * pagelimit);
        if (Boolean(filterval.length)) {
            const currentdata = filterval.slice(offset, offset + pagelimit);
            setoffset(offset);
            setselected(selected);
            setdateshow(currentdata);
        } else {
            const currentdata = rowsPerPage.slice(offset, offset + pagelimit);
            setoffset(offset);
            setselected(selected);
            setdateshow(currentdata);
        }
    };
    return (
        <div className='bg-dashbord  vh-100'>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />



            <div className='p-3'>
                <div className='p-3 card vh-80'>
                    <h3>Tous Les Agents</h3>
                    <div className="container p-5 client">


                        <div className="main-client">


                            <table className="table table-borderless ">
                                <thead>
                                    <tr className="th-table">
                                        <th className="col">Nom de L’agent</th>
                                        <th className="col">Numéro</th>
                                        <th className="col">Groupe de destination</th>
                                        <th className="col">Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dateshow.length > 0 ? (
                                        dateshow.map((el, index) => {
                                            return (
                                                <tr key={index} className="">
                                                    <td className="col" label={"Nom de L’agent"}>
                                                        {el.name}
                                                    </td>
                                                    <td className="col" label={"Numéro"}>
                                                        {el.phone || "-"}
                                                    </td>

                                                    <td className="col" label={"Groupe de destination"}>
                                                        {el.group}
                                                    </td>

                                                    <td className="col" label={"Email"}>
                                                        {el.email}
                                                    </td>
                                                    <td className="col" label={"Action"}>

                                                        <button
                                                            className="mr-1rem btn btn-danger "
                                                            data-toggle="modal"
                                                            data-target="#exampleModal"
                                                            onClick={() => setrowsuprission(el)}
                                                        >
                                                            Supprimer
                                                        </button>
                                                        <button
                                                            className="btn  btn-success-roundesk "
                                                            onClick={() => showupdatedrower(el)}
                                                        >
                                                            Modifier
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr scope="row">
                                            <td colSpan="2" className="text-center">
                                                {" "}
                                                {"Aucun donner "}{" "}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div
                            className={!Boolean(dateshow.length) ? "d-none" : "pagination"}
                        >
                            <ReactPaginate
                                previousLabel={"<"}
                                nextLabel={">"}
                                breakLabel={"..."}

                                pageCount={
                                    filterval.length > 0
                                        ? Math.ceil(filterval.length / pagelimit)
                                        : Math.ceil(rowsPerPage.length / pagelimit)
                                }
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={2}
                                onPageChange={onPageChanged}
                                breakClassName={'page-item'}
                                breakLinkClassName={'page-link'}
                                containerClassName={'pagination'}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                previousClassName={'page-item'}
                                previousLinkClassName={'page-link'}
                                nextClassName={'page-item'}
                                nextLinkClassName={'page-link'}
                                activeClassName={'active'}
                                initialPage={0}
                                forcePage={selected}
                            />
                        </div>
                        <div
                            className="modal fade"
                            id="exampleModal"
                            tabIndex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog">
                                <div className="modal-content rounded-corners">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">
                                            {" "}
                                            {"Êtes-vous sûr de vouloir supprimer cet agent ?"}
                                        </h5>

                                    </div>
                                    <div className="modal-body color-text-modal">{"Cette action est irréversible."}</div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            ref={refmodal}
                                            className="btn btn-secondary p-2"
                                            data-dismiss="modal"
                                        >
                                            {"Annuler"}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-success-roundesk p-2"
                                            onClick={() => deletecustomer()}
                                        >
                                            {"Supprimer"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Users;