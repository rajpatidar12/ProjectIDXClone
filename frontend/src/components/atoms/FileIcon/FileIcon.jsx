import { FaCss3, FaHtml5, FaJs } from "react-icons/fa";
import { GrReactjs } from "react-icons/gr";
import { PiFileSvgLight } from "react-icons/pi";
import { SiGitignoredotio } from "react-icons/si";
import { VscJson } from "react-icons/vsc";
export const FileIcon = ({ extension }) => {
  const iconStyle = {
    height: "15px",
    width: "15px",
  };

  const IconMapper = {
    js: <FaJs color="#F9D700" style={iconStyle} />,
    jsx: <GrReactjs color="#61dbfa" style={iconStyle} />,
    css: <FaCss3 color="#3c99dc" style={iconStyle} />,
    html: <FaHtml5 color="e34c26" style={iconStyle} />,
    svg: <PiFileSvgLight color="grey" style={iconStyle} />,
    gitignore: <SiGitignoredotio color="orange" style={iconStyle} />,
    json: <VscJson color="red" style={iconStyle} />,
  };
  return <>{IconMapper[extension]}</>;
};
