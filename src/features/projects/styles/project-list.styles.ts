import styled from "styled-components";

export const Panel = styled.section`
  background:#fff;border:1px solid #e8ebe5;padding:20px;min-width:0;
  header{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:19px}
  h2{font:700 14px Manrope,sans-serif;margin:0;letter-spacing:-.03em}
  header span{font-size:10px;color:#858d86}
`;
export const List = styled.div`overflow:hidden;`;
export const Item = styled.article`
  display:grid;grid-template-columns:62px minmax(100px,1fr) auto auto;align-items:center;gap:14px;padding:13px 0;border-top:1px solid #eef0ec;
  img{width:62px;height:45px;object-fit:cover;background:#eef0ec}
  strong{display:block;font-size:11px}
  small{display:block;color:#7d867e;font-size:9px;margin-top:5px}
  @media(max-width:520px){grid-template-columns:50px 1fr auto;gap:9px;img{width:50px;height:40px}&>span{display:none}}
`;
export const Badge = styled.span<{ $tone: "green" | "amber" }>`
  display:inline-flex;padding:5px 8px;background:${({ $tone }) => $tone === "green" ? "#eef4df" : "#fbf1d9"};
  color:${({ $tone }) => $tone === "green" ? "#627d21" : "#926914"};font-size:9px;font-weight:700;
`;
export const Actions = styled.div`display:flex;gap:6px;button{width:31px;height:31px;border:1px solid #e5e8e2;background:#fff;cursor:pointer;color:#505950}`;
export const Empty = styled.div`padding:35px 20px;text-align:center;font-size:12px;color:#7c857d;`;
