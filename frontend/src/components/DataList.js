import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Table } from "./Table";
import { Modal } from "./Modal";
import '../App.css';

const DataList = ({ accessToken = sessionStorage.getItem('accessToken') }) => {
    const userRole = sessionStorage.getItem('role')
    const [data, setData] = useState([]);
    const fetchData = useCallback(async () => {
    try {
        const response = await axios.get('http://localhost:8000/get_data', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        setData(response.data);
    } catch (error) {
        console.error("error is here"); // Handle error
    }},[accessToken]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const [modalOpen, setModalOpen] = useState(false);
    const [rowToEdit, setRowToEdit] = useState(null);

    const handleEditRow = (idx) => {
        setRowToEdit(idx);
        setModalOpen(true);
     };

    const handleSubmit = async (newRow) => {
        if (rowToEdit === null) { // If rowToEdit is null, it means the user is adding a new row
            try {
                await addData(newRow);
                fetchData();
            } catch (error) {
                console.error(error); // Handle error
            }
        } else {
        handleEdit(newRow.id, newRow);
        setData(
            data.map((currRow, id) => {
                if (id !== rowToEdit) return currRow;
                return newRow;
            })
        );}
    };

    const addData = async (newData) => {
    try {
      const response = await axios.post('http://localhost:8000/add_data', newData, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }});
      console.log(response)
    // Refresh data after adding new data
    } catch (error) {
        console.error(error); // Handle error
    }};

    const handleEdit = async (id, newRow) => {
        try {
            await axios.put(`http://localhost:8000/update_data/${id}`, newRow, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            // After successful update, fetch the updated data
            const response = await axios.get('http://localhost:8000/get_data', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setData(response.data);
        } catch (error) {
            console.error(error); // Handle error
        }
    };

  return (
   <div>
     <Table data={data} editRow={handleEditRow} role={userRole} />
     <div className="addbtn-container">
     {userRole === 'admin' && (
        <button onClick={() => setModalOpen(true)} className="addbtn">
            Add
        </button>
        )}
        </div>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && data[rowToEdit]}
        />
      )}
   </div>
  );
};

export default DataList;
