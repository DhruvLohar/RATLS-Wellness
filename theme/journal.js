import { actions } from "react-native-pell-rich-editor";
import { Image, TextalignCenter, TextalignLeft, TextalignRight, TextBold, TextItalic, TextUnderline } from "iconsax-react-native";
import Colors from "./colors";
import { Text } from "react-native";

const ToolBarIcon = ({ Icon }) => <Icon color={Colors.dark} size={16} />

export const CustomActions = [
    actions.setBold,
    actions.setItalic,
    actions.setUnderline,

    'divider',

    actions.alignLeft,
    actions.alignCenter,
    actions.alignRight,

    'divider',

    actions.heading1,
    actions.heading2,
    actions.setParagraph,

    'divider',

    actions.insertBulletsList,
    actions.insertOrderedList,
    actions.checkboxList,

    'divider',

    actions.insertImage
]

export const CustomIconMap = {
    [actions.setBold]: () => <ToolBarIcon Icon={TextBold} />,
    [actions.setItalic]: () => <ToolBarIcon Icon={TextItalic} />,
    [actions.setUnderline]: () => <ToolBarIcon Icon={TextUnderline} />,

    [actions.alignLeft]: () => <ToolBarIcon Icon={TextalignRight} />,
    [actions.alignCenter]: () => <ToolBarIcon Icon={TextalignCenter} />,
    [actions.alignRight]: () => <ToolBarIcon Icon={TextalignLeft} />,

    [actions.insertImage]: () => <ToolBarIcon Icon={Image} />,

    'divider': () => <Text>•</Text>,

    [actions.heading1]: () => <Text>H1</Text>,
    [actions.heading2]: () => <Text>H2</Text>,
    [actions.setParagraph]: () => <Text>P</Text>,
}