import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body { background:#f5f7f8; font-family:"DM Sans",sans-serif; }
`;
export const Shell = styled.div`min-height:100vh; color:#112d44;`;
export const Logo = styled.div`
  display:flex;align-items:center;gap:11px;font:800 11px Manrope,sans-serif;letter-spacing:.06em;
  small{display:block;color:#718293;font:600 9px "DM Sans",sans-serif;letter-spacing:.18em;margin-top:4px}
`;
export const LogoMark = styled.span`
  width:40px;height:40px;background:#087bff;color:#fff;display:grid;place-items:center;font:800 14px Manrope,sans-serif;
`;
export const BrandImage = styled.img`width:40px;height:40px;object-fit:cover;background:#ffffff;`;
export const Layout = styled.div`min-height:100vh;display:grid;grid-template-columns:240px minmax(0,1fr);@media(max-width:760px){grid-template-columns:1fr}`;
export const Sidebar = styled.aside`
  background:#062c4d;color:#fff;display:flex;flex-direction:column;min-height:100vh;
  @media(max-width:760px){min-height:auto;padding:15px;position:sticky;top:0;z-index:4}
`;
export const SideLogo = styled(Logo)`padding:30px 10px;border-bottom:1px solid #dce3e8;color:#062c4d;background:#fff;@media(max-width:760px){padding:0 4px 12px}`;
export const Navigation = styled.nav`
  display:grid;gap:5px;margin-top:24px;
  @media(max-width:760px){display:flex;overflow:auto;margin-top:12px}
  button{border:0;background:transparent;color:#c2d0db;text-align:left;display:flex;align-items:center;gap:12px;padding:12px 11px;cursor:pointer;font-size:12px;white-space:nowrap}
  button:hover,button[aria-current="page"]{background:#0b3a62;color:#fff}
  button[aria-current="page"] i{color:#5aa5ff}
  i{font-style:normal;width:18px;text-align:center;font-size:16px}
`;
export const SidebarBottom = styled.div`margin-top:auto;padding:20px 10px 0;color:#bdcbd6;font-size:10px;line-height:1.7;@media(max-width:760px){display:none}`;
export const Main = styled.main`min-width:0;padding:32px clamp(18px,4vw,56px) 60px;`;
export const Topbar = styled.div`
  display:flex;align-items:center;justify-content:space-between;gap:15px;margin-bottom:31px;
  span{font-size:11px;color:#718293}
  @media(max-width:480px){align-items:flex-start;flex-direction:column}
`;
export const Eyebrow = styled.div`color:#526b80;font-size:9px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;`;
export const Heading = styled.div`
  display:flex;justify-content:space-between;align-items:flex-end;gap:15px;margin-bottom:25px;
  h1{font:800 clamp(23px,3vw,30px) Manrope,sans-serif;letter-spacing:-.055em;margin:5px 0 0}
  p{font-size:12px;color:#718293;margin:8px 0 0}
  @media(max-width:520px){align-items:flex-start;flex-direction:column}
`;
export const Button = styled.button<{ $quiet?: boolean }>`
  display:inline-flex;align-items:center;justify-content:center;min-height:39px;padding:0 14px;
  border:1px solid ${({ $quiet }) => ($quiet ? "#dce3e8" : "#0056b3")};
  background:${({ $quiet }) => ($quiet ? "#fff" : "#0056b3")};color:${({ $quiet }) => ($quiet ? "#062c4d" : "#fff")};
  font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap;
  &:hover{filter:brightness(.92)}:focus-visible{outline:3px solid #5aa5ff;outline-offset:2px}:disabled{opacity:.6;cursor:wait}
`;
export const StatGrid = styled.div`display:grid;grid-template-columns:repeat(4,1fr);gap:13px;margin-bottom:20px;@media(max-width:950px){grid-template-columns:repeat(2,1fr)}@media(max-width:430px){grid-template-columns:1fr}`;
export const StatCard = styled.div`
  background:#fff;border:1px solid #dce3e8;padding:19px;
  span{display:block;color:#718293;font-size:10px}
  strong{display:block;font:800 28px Manrope,sans-serif;letter-spacing:-.06em;margin:11px 0 4px}
  small{font-size:9px;color:#0056b3}
`;
export const ChartGrid = styled.div`display:grid;grid-template-columns:minmax(0,1.6fr) minmax(220px,.8fr);gap:15px;margin-bottom:18px;@media(max-width:850px){grid-template-columns:1fr}`;
export const Panel = styled.section`
  background:#fff;border:1px solid #dce3e8;padding:20px;min-width:0;
  header{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:19px}
  h2{font:700 14px Manrope,sans-serif;margin:0;letter-spacing:-.03em}
  header span{font-size:10px;color:#718293}
`;
export const ChartBox = styled.div`height:215px;position:relative;`;
export const TablePanel = styled(Panel)`padding:0;overflow:hidden;header{padding:19px 20px 0}`;
export const Overlay = styled.div`
  position:fixed;inset:0;z-index:20;background:#062c4db8;padding:20px;display:grid;place-items:center;overflow:auto;
`;
export const Modal = styled.form`
  width:min(560px,100%);max-height:90vh;overflow:auto;background:#fff;padding:25px;
  h2{font:800 20px Manrope,sans-serif;letter-spacing:-.05em;margin:0 0 7px}
  >p{font-size:11px;color:#718293;margin-bottom:20px}
`;
export const FormGrid = styled.div`display:grid;grid-template-columns:1fr 1fr;gap:0 13px;@media(max-width:520px){grid-template-columns:1fr}`;
export const Field = styled.label<{ $full?: boolean }>`
  display:block;grid-column:${({ $full }) => $full ? "1/-1" : "auto"};font-size:10px;font-weight:700;margin:0 0 14px;
  input,select,textarea{display:block;width:100%;margin-top:6px;border:1px solid #cbd6df;background:#f8fafb;padding:11px;font-size:11px;outline:none;color:#112d44}
  textarea{resize:vertical}input:focus,select:focus,textarea:focus{border-color:#087bff;box-shadow:0 0 0 2px #087bff26}
  span{color:#718293;font-weight:400}
`;
export const ModalActions = styled.div`display:flex;justify-content:flex-end;gap:8px;padding-top:8px`;
export const ErrorMessage = styled.p`padding:10px 12px;background:#fff0ed;border-left:2px solid #b42318;color:#8a1c13;font-size:11px;line-height:1.5`;
export const SettingGrid = styled.div`display:grid;grid-template-columns:1fr 1fr;gap:14px;@media(max-width:700px){grid-template-columns:1fr}`;
export const SettingsForm = styled.form`display:contents;`;
export const InlineActions = styled.div`display:flex;gap:8px;margin-top:15px;`;
