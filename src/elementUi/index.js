import Vue from 'vue'
import {
    Tag,
    MessageBox,
    Button,
    Menu,
    MenuItem,
    Submenu,
    Tabs,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    TabPane,
    Container,
    Header,
    Image,
    Aside,
    Main,
    Radio,
    RadioGroup,
    DatePicker,
    Pagination,
    Empty,
    Checkbox,
    Divider
} from 'element-ui'
import { Row, Col, Avatar, Select, Input, Option, Form, FormItem, carousel, carouselItem, card, Dialog, Upload, Badge } from 'element-ui'
Vue.use(Button).use(Menu).use(MenuItem).use(Submenu).use(Container).use(Header).use(Aside).use(Main).use(Badge).use(Dialog)
    .use(Image).use(Row).use(Col).use(carousel).use(Avatar).use(carouselItem).use(Radio).use(RadioGroup)
    .use(Tabs).use(Dropdown).use(DropdownMenu).use(DropdownItem).use(Divider).use(Checkbox).use(Tag).use(Empty).use(Pagination).use(TabPane).use(DatePicker).use(card).use(Select).use(Input).use(Option).use(Form).use(FormItem).use(Upload)

Vue.component(MessageBox.name, MessageBox)
Vue.prototype.$message = MessageBox