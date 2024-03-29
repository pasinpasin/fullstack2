import styled from "styled-components";
const Wrapper = styled.section`
  h1 {
    text-align: center;
    margin-bottom: 40px;
  }
  table {
    width: 100%;
    table-layout: auto;
    /*table-layout: fixed; */
    border-collapse: collapse;
    margin: 0 auto;
  }
  table.classname {
    width: 100%;
    table-layout: auto;
    /*table-layout: fixed; */
    border-collapse: collapse;
    margin: 0 auto;
    font-family: Verdana !important;
    font-size: small !important;
  }
  /* Zebra striping */
  tr:nth-of-type(odd) {
    background: #f2f2f2;
  }
  th {
    background: #e74c3c;
    color: #fff;
    font-weight: 600;
  }
  td,
  th {
    padding: 12px;
    border: 1px solid #ccc;
    text-align: left;
    text-align: center;
  }

  th.classname {
    background: #e74c3c;
    color: #fff;
    font-weight: 50;
  }
  td.classname,
  th.classname {
    padding: 2px;
    border: 1px solid #ccc;
    text-align: left;
    text-align: center;
  }
  td Link {
    display: block;
    width: 100%;
  }
  /*Mobile View*/
  @media only screen and (max-width: 760px) {
    td,
    tr {
      display: block;
    }

    /* Hide table headers (but not display: none;, for accessibility) */
    thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }
    tr {
      border: 1px solid #e74c3c;
    }
    tr + tr {
      margin-top: 1.5em;
    }
    td {
      /* make like a "row" */
      border: none;
      border-bottom: 1px solid #eee;
      position: relative;
      padding-left: 50%;
      background-color: #f8d9d5;
      text-align: left;
    }
    td:before {
      content: attr(data-label);
      display: inline-block;
      line-height: 1.5;
      margin-left: -100%;
      width: 100%;
      white-space: nowrap;
    }
    input {
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
       box-sizing: border-box;
      padding: 10px;
  }
  }
`;
export default Wrapper;
