import { Button, Modal, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';
import { EyeOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import Layout from '../../components/Layout'

const Bills = () => {
    const componentRef = useRef();
    const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const getAllBills = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const {data} = await axios.get('/api/bills/getbills');
      setBillsData(data);
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(data);

    } catch(error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(error);
    }
  };

  useEffect(() => {
      getAllBills();
  }, []);

  

  const columns = [
    {
        title: "ID",
        dataIndex: "_id"
    },
    {
        title: "Customer Name",
        dataIndex: "customerName",
    }, 
    {
        title: "Contact Number",
        dataIndex: "customerPhone",
    }
    , 
    {
        title: "Customer Address",
        dataIndex: "customerAddress",
    },
    {
        title: "Sub Total",
        dataIndex: "subTotal",
    },
    {
        title: "Tax",
        dataIndex: "tax",
    },
    {
        title: "Total Amount",
        dataIndex: "totalAmount",
    },
    {
        title: "Action",
        dataIndex: "_id",
        render:(id, record) => 
        <div>
          <EyeOutlined className='cart-edit eye' onClick={() => {setSelectedBill(record); setPopModal(true);}} />
        </div>
        
    }
  ]

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Layout>
        <h2>All Invoice </h2>
      <Table dataSource={billsData} columns={columns} bordered />
      
      {
        popModal && 
        <Modal title="Invoice Details" width={400} pagination={false} visible={popModal} onCancel={() => setPopModal(false)} footer={false}>
          <div className="card" ref={componentRef}>
            <div className="cardHeader">
                <h2 className="logo">MP POS</h2>
                <span>Number: <b>+381/0000000</b></span>
                <span>Address: <b>34000 Kragujevac, Serbia</b></span>
            </div>
            <div className="cardBody">
                <div className="group">
                    <span>Customer Name:</span>
                    <span><b>{selectedBill.customerName}</b></span>
                </div>
                <div className="group">
                    <span>Customer Phone:</span>
                    <span><b>{selectedBill.customerPhone}</b></span>
                </div>
                <div className="group">
                    <span>Customer Address:</span>
                    <span><b>{selectedBill.customerAddress}</b></span>
                </div>
                <div className="group">
                    <span>Date Order:</span>
                    <span><b>{selectedBill.createdAt.toString().substring(0, 10)}</b></span>
                </div>
                <div className="group">
                    <span>Total Amount:</span>
                    <span><b>${selectedBill.totalAmount}</b></span>
                </div>
            </div>
            <div className="cardFooter">
                <h4>Your Order</h4>
                {selectedBill.cartItems.map((product) => (
                    <>
                        <div className="footerCard">
                            <div className="group">
                                <span>Product:</span>
                                <span><b>{product.name}</b></span>
                            </div>
                            <div className="group">
                                <span>Qty:</span>
                                <span><b>{product.quantity}</b></span>
                            </div>
                            <div className="group">
                                <span>Price:</span>
                                <span><b>${product.price}</b></span>
                            </div>
                        </div>
                    </>
                ))}
                <div className="footerCardTotal">
                    <div className="group">
                        <h3>Total:</h3>
                        <h3><b>${selectedBill.totalAmount}</b></h3>
                    </div>
                </div>
                <div className="footerThanks">
                    <span>Thank You for buying from us</span>
                </div>
            </div>
          </div>
          <div className="bills-btn-add">
            <Button onClick={handlePrint} htmlType='submit' className='add-new'>Generate Invoice</Button>
        </div>  
        </Modal>
      }
    </Layout>
  )
}

export default Bills
