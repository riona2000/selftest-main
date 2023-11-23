import { Box } from "@mui/material";

type Props = {
  onClick?: () => void,
  selected: boolean,
  size: number,
  backgroundColor: string,
}

const CircleBox: React.FC<Props> = ({ onClick, selected, size, backgroundColor }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: size + 'px',
        height: size + 'px',
        borderRadius: '50%',
        border: '2px solid gray',
        backgroundColor: selected ? backgroundColor : 'transparent', // 選択されている場合は指定された背景色を使用
        cursor: "pointer"
      }}
    />
  );
}


export default CircleBox;
