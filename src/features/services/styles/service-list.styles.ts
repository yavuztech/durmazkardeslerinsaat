import styled from "styled-components";

export const Panel = styled.section`
  background:#fff;border:1px solid #e8ebe5;padding:20px;min-width:0;
  header{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:19px}
  h2{font:700 14px Manrope,sans-serif;margin:0;letter-spacing:-.03em}
  header span{font-size:10px;color:#858d86}
`;
export const Item = styled.article`
  display:grid;grid-template-columns:42px minmax(100px,1fr) auto auto;align-items:center;gap:14px;padding:13px 0;border-top:1px solid #eef0ec;
  strong{display:block;font-size:11px}
  small{display:block;color:#7d867e;font-size:9px;margin-top:5px}
  @media(max-width:520px){grid-template-columns:42px 1fr auto;gap:9px;&>span{display:none}}
`;
export const Icon = styled.span`width:40px;height:40px;background:#a8c94a;display:grid;place-items:center;font:800 14px Manrope,sans-serif;`;
export const Badge = styled.span<{ $active: boolean }>`
  display:inline-flex;padding:5px 8px;background:${({ $active }) => $active ? "#eef4df" : "#f0f1ef"};
  color:${({ $active }) => $active ? "#627d21" : "#69716b"};font-size:9px;font-weight:700;
`;
export const Actions = styled.div`display:flex;gap:6px;button{width:31px;height:31px;border:1px solid #e5e8e2;background:#fff;cursor:pointer;color:#505950}`;
export const Empty = styled.div`padding:35px 20px;text-align:center;font-size:12px;color:#7c857d;`;
