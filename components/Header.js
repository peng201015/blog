import React,{useState,useEffect} from 'react';
import '../public/style/components/header.css'
import axios from 'axios';
import Link from 'next/link'
import service from "../config/apiUrl";

import {Row,Col, Menu, Icon} from 'antd'
import Router from 'next/router';
const Header = () => {
    const [type,useType] = useState([])
    useEffect(()=> {
        const fetchData = async () => {
            await axios(service.getType).then(res => {
                useType(res.data.data)
            })
        }
        fetchData()
    },[])

    const handlerRoute = (e) =>{
        if(e.key == 0) {
            Router.push('/')
        }else if(e.key == 1) {
            Router.push('/list')
        }else if(e.key == 2) {
            Router.push('/detail?id='+e.key)
        }
    }

    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className="header-logo">技术胖</span>
                    <span className="header-txt">专注前端开发,每年100集免费视频。</span>
                </Col>

                <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu onClick={handlerRoute} mode="horizontal">
                        {type.map((item,index) => {
                            return(
                                <Menu.Item key={item.id}>
                                    <Icon type={item.icon} />
                                    {item.typeName}
                                </Menu.Item>
                            )
                        })}
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Header