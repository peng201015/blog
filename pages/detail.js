import React, { useState } from 'react';
import Head from 'next/head';
import {Row, Col, Icon ,Breadcrumb} from 'antd'
import axios from 'axios';
import Header from "../components/Header"
import Author from "../components/Author"
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import "../public/style/pages/detail.css"
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import service from "../config/apiUrl";
// import ReactMarkdown from 'react-markdown'


const Detail = (detail) => {
  const [content,useContent] = useState(detail.data[0])

  return (
    <>
      <Head>
        <title>Detail</title>
      </Head> 
      <Header/>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                <Breadcrumb.Item>xxxx</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <div className="detailed-title">
              {content.title}
              </div>

              <div className="list-icon center">
                <span><Icon type="calendar" /> {content.addTime}</span>
                <span><Icon type="folder" /> {content.typeName}</span>
                <span><Icon type="fire" /> {content.view_count}人</span>
              </div>

              <div className="detailed-content" >
                {content.article_content}
              </div>
            </div>
          </div>
        </Col>
  
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <div className="detailed-nav comm-box">
            <div className="nav-title">文章目录</div>
            <MarkNav
              className="article-menu"
              source={content.title}
              ordered={false}
            />
          </div>
        </Col>
      </Row>
  
    </>
  )
}

Detail.getInitialProps = async(context) => {
    let id = context.query.id;
    const promise = new Promise((resolve) => {
      axios(service.getArticleById + id).then(res => {
        resolve(res.data)
      })
    })
    return promise
}

export default Detail 