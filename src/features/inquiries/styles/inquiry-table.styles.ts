import styled from "styled-components";

export const TableWrap = styled.div`
  overflow-x:auto;
  @media(max-width:760px){overflow:visible;padding:0 14px 14px}
`;
export const Table = styled.table`
  width:100%;border-collapse:collapse;text-align:left;
  th{font-size:9px;text-transform:uppercase;letter-spacing:.08em;color:#718293;background:#f8fafb}
  th,td{padding:13px 16px;border-bottom:1px solid #e8eef3;font-size:11px}
  td{color:#526b80;vertical-align:top}
  td strong{font-size:12px;color:#112d44}
  td a{color:#0056b3;text-decoration:underline;text-underline-offset:2px}
  tr:last-child td{border-bottom:0}
  @media(max-width:760px){
    display:block;white-space:normal;
    thead{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
    tbody{display:grid;gap:12px}
    tr{display:block;background:#fff;border:1px solid #dce3e8;border-radius:8px;padding:14px;box-shadow:0 2px 8px #062c4d0a}
    td,th{border:0;padding:7px 0}
    td{display:grid;grid-template-columns:minmax(76px, .65fr) minmax(0, 1.35fr);gap:10px;align-items:start;font-size:12px;overflow-wrap:anywhere}
    td::before{content:attr(data-label);color:#718293;font-size:10px;font-weight:700}
    td:first-child{display:block;padding-top:0}
    td:first-child::before{display:none}
    td:first-child strong{display:block;font-size:14px;margin-bottom:3px}
    td:last-child{border-top:1px solid #e8eef3;margin-top:5px;padding-top:12px}
    td:last-child::before{padding-top:9px}
  }
`;
export const CustomerDetails = styled.div`
  max-width:360px;margin-top:5px;color:#718293;font-size:11px;line-height:1.5;
  overflow-wrap:anywhere;
  @media(max-width:760px){max-width:none}
`;
export const Actions = styled.div`
  display:flex;align-items:center;gap:7px;
  @media(max-width:760px){align-items:stretch}
`;
export const StatusSelect = styled.select`
  min-height:36px;border:1px solid #cbd6df;padding:7px 9px;font-size:11px;background:#fff;color:#112d44;
  &:focus-visible{outline:2px solid #087bff;outline-offset:1px}
  @media(max-width:760px){flex:1;min-width:0}
`;
export const DeleteButton = styled.button`
  min-height:36px;min-width:52px;border:1px solid #dce3e8;background:#fff;color:#8a1c13;padding:6px 10px;
  font-size:11px;font-weight:700;cursor:pointer;
  &:hover{background:#fff0ed}
  &:focus-visible{outline:2px solid #087bff;outline-offset:1px}
`;
export const Badge = styled.span<{ $tone: "green" | "amber" | "gray" }>`
  display:inline-flex;padding:5px 8px;background:${({ $tone }) => $tone === "green" ? "#eef4df" : $tone === "amber" ? "#fbf1d9" : "#f0f1ef"};
  color:${({ $tone }) => $tone === "green" ? "#627d21" : $tone === "amber" ? "#926914" : "#69716b"};
  font-size:9px;font-weight:700;
`;
export const Empty = styled.div`
  padding:35px 20px;text-align:center;font-size:12px;color:#718293;line-height:1.6;
  @media(max-width:760px){padding:26px 18px}
`;
