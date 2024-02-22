import HomeIcon from "@mui/icons-material/Home";
import pageRoutes from "./pageRoutes";

// ส่งออกฟังก์ชันสำหรับรายการ sidebar
export const sidebarItems_report = () => {
  return pageRoutes.map((item) => ({
    name: item.title,
    pageName: item.pageName,
    link: item.path,
    icon: item.icon,
  }));
};

// ส่งออกฟังก์ชันสำหรับการเลือกชื่อหน้า
export const getPageTitle = (path) => {
  const page = pageRoutes.find((p) => p.path === path);
  return page ? page.title : "Default Title";
};
