/**
 * Grid Component Demo for uxcore
 * @author zhouquan.yezq
 *
 * Copyright 2014-2015, Uxcore Team, Alinw.
 * All rights reserved.
 */

let classnames = require('classnames');
let Grid = require('../src');
let Button = require('uxcore-button');
let urlPrefix = 'http://30.9.174.1:3000/';
let mockData = {
    "data": [
        {
            "check": true,
            "id":"1",
            "grade":"grade1",
            "email":"email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1",
            "firstName":"firstName1",
            "lastName":"lastName1",
            "birthDate":"birthDate1",
            "country":"086156529655931.121(xsxs)",
            "city":"87181"
        },
        {
            "check": false,
            "id":"1",
            "grade":"grade1",
            "email":"email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1email1",
            "firstName":"firstName1",
            "lastName":"lastName1",
            "birthDate":"birthDate1",
            "country":"086156529655931.121(xsxs)",
            "city":"87181"
        }
    ]
}


class Demo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleClick() {
        mockData.datas[0].check = !mockData.datas[0].check;
        this.forceUpdate();
    }

    componentWillUpdate() {
        // this.refs.grid.fetchData();
    }

    onModifyRow(value,dataKey,record) {
        return true;
    }

    render () {

        let me=this;
        // 通过 rowSelection 对象表明需要行选择
        let rowSelection = {
          onSelect: function(record, selected, selectedRows) {
            console.log(record, selected, selectedRows);
          },
          onSelectAll: function(record, selectedRows) {
            console.log(record, selectedRows);
          }
        };
        //[{title:'编辑', type:"inlineEdit1", cb: function(rowData){ me.refs.grid.toggleSubComp(rowData)}},
        //      {title:'删除', type:"del", cb: function(rowData){ me.refs.grid.delRow(rowData)}}
        //  ]
        // title, width, type, hidden,dataKey
        let columns = [
            { dataKey: 'check', title: '复选框', type: 'checkbox'},
            { dataKey: 'id', title: 'ID', width: 50,hidden:true},
            { dataKey: 'country', title:'国家国家', width: 200,ordered:true, type: "money", delimiter: ','},
            {
                group: '大表头测试',
                columns: [
                    { dataKey: 'city',title:'城市', width: 150},
                    { dataKey: 'firstName',title:"FristName",beforeRender:function(rowData) {
                        return "abc";
                    } },  
                    { dataKey: 'lastName' ,title:"LastName"}
                ]
            },
            { dataKey: 'email',title:"Email",width: 200,ordered:true },
            { dataKey: 'action1', title:'操作1', width:100, type:"action",actions:{
                "编辑": function(rowData, actions) {
                    console.log(actions.addEmptyRow);
                    me.refs.grid.toggleSubComp(rowData);
                },
                "删除": function(rowData) {
                    me.refs.grid.delRow(rowData);
                }
              },
              beforeRender: function(rowData,actionItems) {
                 if(rowData.jsxid%2==0) {
                    return ['编辑'];
                 }else {
                    return ['编辑','删除'];
                 }
                 
              }
            },
            { dataKey: 'action', title:'链接', width:150,render: function(cellData,rowData){
               return <div><a href="#">{rowData.email}</a></div>
              },beforeRender(rowData) {
                return rowData.email;
              }
            }
        ];

        let subCols = [
          {dataKey: 'firstName', title: 'firstName', width: 200},
          {dataKey: 'city', title: '城市', width: 200}
        ]

        let renderSubProps={
            height: 100,
            width: 1196,
            showHeader:true,
            showPager:false,
            jsxcolumns:subCols,
            // fetchUrl:"http://demo.nwux.taobao.net/file/getGridJson.jsonp",
            queryKeys:["firstName", "city"],
            onModifyRow: this.onModifyRow,
            processData: (data) => {return {datas: [data]};}
        };

        let renderProps={
            height: 400,
            width: 1000,
            actionBar: {
               '新增': function(type, actions) { console.info(actions); alert(type) },
               '黄山': function(type) {alert(type)}
            },
            mode:'view',
            showSearch: true,
            fetchParams: {},
            // jsxdata: mockData,
            //fetchUrl:"http://demo.nwux.taobao.net/file/getGridJson.jsonp",
            fetchUrl: urlPrefix + "demo/data.json",
            jsxcolumns:columns,
            emptyText: "没有",
            //subComp:(<Grid {...renderSubProps}  ref="subGrid"/>),
            //rowSelection: rowSelection,
            addRowClassName: (rowData) => {},
            beforeFetch: (sendData, from) => { return sendData;},
            processData: (data) => {return data;}           
        };
        return (
            <div>
                <Grid {...renderProps}  ref="grid"/>
                <Button onClick={me.handleClick.bind(me)}>页面重新渲染</Button>
            </div>
        );
      }
};

module.exports = Demo;
