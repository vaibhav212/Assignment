import React from "react";
import {BsFillPencilFill } from "react-icons/bs";
import '../App.css';

export const Table = ({ data, editRow, role }) => {
  return (
   <div className="table-wrapper">
    <table className="table">
        <thead>
          <tr>
             <th>Id</th>
            <th>User ID</th>
            <th className="expand">Message</th>
             {role === 'admin' && (
                <th>Actions</th>
                )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => {
            return (
              <tr key={idx}>
                <td>{row.id}</td>
                <td> {row.userID}</td>
                <td className="expand">{row.message}</td>
                {role === 'admin' && (
                <td className="fit">
                  <span className="actions">
                    <BsFillPencilFill className="edit-btn" onClick={() => editRow(idx)} />
                  </span>
                </td>
                    )}
              </tr>
          );
          })}
        </tbody>
      </table>
    </div>
  );
};
