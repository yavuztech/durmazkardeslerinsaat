import styled from "styled-components";

export const Panel = styled.section`
  background:#fff;border:1px solid #e8ebe5;padding:20px;min-width:0;
  header{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:19px}
  h2{font:700 14px Manrope,sans-serif;margin:0;letter-spacing:-.03em}
  header span{font-size:10px;color:#858d86}
`;
export const Item = styled.article`
  display:grid;grid-template-columns:42px minmax(0,1fr) auto auto;align-items:center;gap:14px;padding:13px 0;border-top:1px solid #eef0ec;
  strong{display:block;font-size:11px;overflow-wrap:anywhere}
  small{display:block;color:#7d867e;font-size:9px;line-height:1.5;margin-top:5px;overflow-wrap:anywhere}
  @media(max-width:520px){
    grid-template-columns:36px minmax(0,1fr) auto;gap:10px;padding:14px 0;align-items:start;
    &>span:nth-of-type(2){display:none}
    &>div{min-width:0}
    &>div:nth-of-type(1){grid-column:2;grid-row:1}
    &>span:first-child{grid-column:1;grid-row:1}
    &>div:last-child{grid-column:3;grid-row:1}
    strong{font-size:12px}
    small{font-size:11px;line-height:1.5}
  }
`;
export const Icon = styled.span`
  width:40px;height:40px;background:#087bff;color:#fff;display:grid;place-items:center;font:800 14px Manrope,sans-serif;
  @media(max-width:520px){width:36px;height:36px}
`;
export const Badge = styled.span<{ $active: boolean }>`
  display:inline-flex;padding:5px 8px;background:${({ $active }) => $active ? "#eef4df" : "#f0f1ef"};
  color:${({ $active }) => $active ? "#627d21" : "#69716b"};font-size:9px;font-weight:700;
`;
export const Actions = styled.div`
  display:flex;gap:6px;
  button{width:36px;height:36px;border:1px solid #dce3e8;background:#fff;cursor:pointer;color:#0056b3;font-size:15px}
  button:focus-visible{outline:2px solid #087bff;outline-offset:2px}
  @media(max-width:520px){gap:5px;button{width:36px;height:36px}}
`;
export const Empty = styled.div`padding:35px 20px;text-align:center;font-size:12px;color:#7c857d;`;
