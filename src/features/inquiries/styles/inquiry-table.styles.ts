import styled from "styled-components";

export const TableWrap = styled.div`overflow-x:auto;`;
export const Table = styled.table`
  width:100%;border-collapse:collapse;text-align:left;white-space:nowrap;
  th{font-size:9px;text-transform:uppercase;letter-spacing:.08em;color:#858d86;background:#fafbf9}
  th,td{padding:13px 16px;border-bottom:1px solid #eef0ec;font-size:10px}
  td{color:#525b53}
  td strong{font-size:11px;color:#202720}
  tr:last-child td{border-bottom:0}
`;
export const Badge = styled.span<{ $tone: "green" | "amber" | "gray" }>`
  display:inline-flex;padding:5px 8px;background:${({ $tone }) => $tone === "green" ? "#eef4df" : $tone === "amber" ? "#fbf1d9" : "#f0f1ef"};
  color:${({ $tone }) => $tone === "green" ? "#627d21" : $tone === "amber" ? "#926914" : "#69716b"};
  font-size:9px;font-weight:700;
`;
export const Empty = styled.div`padding:35px 20px;text-align:center;font-size:12px;color:#7c857d;`;
