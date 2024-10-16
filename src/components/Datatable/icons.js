import { useTheme } from "styled-components";

import addIconBlack from '../../assets/images/icon_plus_black.png';
import addIconWhite from '../../assets/images/icon_plus_white.png';
import editIconBlack from '../../assets/images/icon_edit_black.png';
import editIconWhite from '../../assets/images/icon_edit_white.png';
import checkIconBlack from '../../assets/images/icon_check_black.png';
import checkIconWhite from '../../assets/images/icon_check_white.png';
import xMarkIconBlack from '../../assets/images/icon_x_mark_black.png';
import xMarkIconWhite from '../../assets/images/icon_x_mark_white.png';
import deleteIconBlack from '../../assets/images/icon_delete_black.png';
import deleteIconWhite from '../../assets/images/icon_delete_white.png';
import initialSortIconBlack from '../../assets/images/icon_sort_initial_black.png';
import initialSortIconWhite from '../../assets/images/icon_sort_initial_white.png';
import upSortIconBlack from '../../assets/images/icon_sort_up_black.png';
import upSortIconWhite from '../../assets/images/icon_sort_up_white.png';
import downSortIconBlack from '../../assets/images/icon_sort_down_black.png';
import downSortIconWhite from '../../assets/images/icon_sort_down_white.png';
import firstIconBlack from '../../assets/images/icon_first_black.png';
import firstIconWhite from '../../assets/images/icon_first_white.png';
import previousIconBlack from '../../assets/images/icon_previous_black.png';
import previousIconWhite from '../../assets/images/icon_previous_white.png';
import nextIconBlack from '../../assets/images/icon_next_black.png';
import nextIconWhite from '../../assets/images/icon_next_white.png';
import lastIconBlack from '../../assets/images/icon_last_black.png';
import lastIconWhite from '../../assets/images/icon_last_white.png';

const getIcon = (iconName) => {
    const theme = useTheme();
    switch(iconName){
        //button_icons
        case 'plus': 
            return (theme.button_icons === "black") ? addIconBlack : addIconWhite;
        case 'edit':
            return (theme.button_icons === "black") ? editIconBlack : editIconWhite;
        case 'check':
            return (theme.button_icons === "black") ? checkIconBlack : checkIconWhite;
        case 'x_mark':
            return (theme.button_icons === "black") ? xMarkIconBlack : xMarkIconWhite;
        case 'delete':
            return (theme.button_icons === "black") ? deleteIconBlack : deleteIconWhite;
        //sort_icons
        case 'unsorted': 
            return (theme.sort_icons === "black") ? initialSortIconBlack : initialSortIconWhite;
        case 'asc': 
            return (theme.sort_icons === "black") ? upSortIconBlack : upSortIconWhite;
        case 'desc': 
            return (theme.sort_icons === "black") ? downSortIconBlack : downSortIconWhite;
        //pagination_icons
        case 'first': 
            return (theme.pagination_icons === "black") ? firstIconBlack : firstIconWhite;
        case 'previous': 
            return (theme.pagination_icons === "black") ? previousIconBlack : previousIconWhite;
        case 'next': 
            return (theme.pagination_icons === "black") ? nextIconBlack : nextIconWhite;
        case 'last': 
            return (theme.pagination_icons === "black") ? lastIconBlack : lastIconWhite;
        //popin_icons
        case 'close':
            return (theme.popin_icons === "black") ? xMarkIconBlack : xMarkIconWhite;
        default: 
            return "";
    }
};

export default getIcon;