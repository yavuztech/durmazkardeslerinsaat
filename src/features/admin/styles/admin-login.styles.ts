import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body { background:#f5f7f8; font-family:"DM Sans",sans-serif; }
`;
export const LoginWrap = styled.main`
  min-height:100vh;display:grid;place-items:center;padding:24px;
  background:radial-gradient(ellipse at top right,#dceaf8,transparent 48%),#f5f7f8;
`;
export const LoginCard = styled.form`
  width:min(420px,100%);padding:38px;background:#fff;border:1px solid #dce3e8;
  box-shadow:0 22px 70px #062c4d12;
  h1{font:800 26px Manrope,sans-serif;letter-spacing:-.05em;margin:24px 0 8px}
  p{font-size:13px;color:#718293;line-height:1.6;margin:0 0 22px}
  label{display:block;font-size:11px;font-weight:700;margin:16px 0 7px}
  input{width:100%;height:44px;padding:0 12px;border:1px solid #cbd6df;background:#f8fafb;outline:0;color:#112d44}
  input:focus{border-color:#087bff;box-shadow:0 0 0 2px #087bff26}
`;
export const Brand = styled.div`
  display:flex;align-items:center;gap:11px;font:800 11px Manrope,sans-serif;letter-spacing:.06em;
  small{display:block;color:#718293;font:600 9px "DM Sans",sans-serif;letter-spacing:.18em;margin-top:4px}
`;
export const Mark = styled.span`width:40px;height:40px;background:#087bff;color:#fff;display:grid;place-items:center;font:800 14px Manrope,sans-serif;`;
export const Submit = styled.button`
  width:100%;height:42px;margin-top:18px;border:1px solid #0056b3;background:#0056b3;
  color:#fff;font-size:11px;font-weight:700;cursor:pointer;
  &:hover{background:#003f87;border-color:#003f87}
  &:focus-visible{outline:3px solid #5aa5ff;outline-offset:2px}
  &:disabled{opacity:.6;cursor:wait}
`;
export const ErrorMessage = styled.p`padding:10px 12px;background:#fff0ed;border-left:2px solid #b42318;color:#8a1c13;font-size:11px;line-height:1.5`;
