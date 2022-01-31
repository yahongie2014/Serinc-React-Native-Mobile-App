/** @format */

import EventEmitter from '../redux/AppEventEmitter';
import {Constants} from '../redux/constants';

const appChangeMenuStyle = () => EventEmitter.emit('app.changeMenuStyle');
const openLeftMenu = () => EventEmitter.emit('left.menu.click');
const closeLeftMenu = () => EventEmitter.emit('left.menu.close');
const openModalLayout = () => EventEmitter.emit('modal.layout.open');
const closeModalLayout = () => EventEmitter.emit('modal.layout.close');
const openModalTag = () => EventEmitter.emit('modal.tag.open');
const openModalCategory = () => EventEmitter.emit('modal.category.open');
const closeModalTag = () => EventEmitter.emit('modal.tag.close');
const readLaterChangeLayout = () => EventEmitter.emit('readlater.changeLayout');
const newsChangeLayout = (params) =>
  EventEmitter.emit('news.changeLayout', params);
const loginRefresh = () => EventEmitter.emit('login.refresh');
const loginShowError = (params) => EventEmitter.emit('login.showError', params);
const loginShowInfo = (params) => EventEmitter.emit('login.showInfo', params);
const logoutUser = () => EventEmitter.emit('logout.user');
const commentShowError = (params) =>
  EventEmitter.emit('comment.showError', params);

const homePageRefresh = () => EventEmitter.emit('homepage.refresh');
const sideMenuRefresh = () => EventEmitter.emit('sidemenu.refresh');
const postCardFetchData = () => EventEmitter.emit('posts.cards.fetchData');
const openPhotoClick = (data) => EventEmitter.emit('open.photo.click', data);
const closePhotoClick = () => EventEmitter.emit('close.photo.click');
const clearPosts = () => EventEmitter.emit('posts.clear.click');

const nextPost = () => EventEmitter.emit('open.post.next');
const openUserModal = (data) => EventEmitter.emit('modal.user.open', data);
const closeUserModal = () => EventEmitter.emit('modal.user.close');
const openFilterModal = () => EventEmitter.emit('modal.filter.open');
const closeFilterModal = () => EventEmitter.emit('modal.filter.close');
const openBookingModal = (post) =>
  EventEmitter.emit('modal.booking.open', post);
const closeBookingModal = () => EventEmitter.emit('modal.booking.close');
const openCommentModal = (data) =>
  EventEmitter.emit('modal.comment.open', data);
const closeCommentModal = () => EventEmitter.emit('modal.comment.close');
const openSearchModal = (isMap) =>
  EventEmitter.emit('modal.search.open', isMap);
const closeSearchModal = () => EventEmitter.emit('modal.search.close');

const reopenBtnFilter = () => EventEmitter.emit('btnFilter.reopen');
const toast = (msg, type = Constants.Toast.info) =>
  EventEmitter.emit(Constants.EmitCode.Toast, msg, type);

const onToast = (func) =>
  EventEmitter.addListener(Constants.EmitCode.Toast, func);
const onAppChangeMenuStyle = (func) =>
  EventEmitter.addListener('app.changeMenuStyle', func);
const onOpenLeftMenu = (func) =>
  EventEmitter.addListener('left.menu.click', func);
const onCloseLeftMenu = (func) =>
  EventEmitter.addListener('left.menu.close', func);
const onOpenModalLayout = (func) =>
  EventEmitter.addListener('modal.layout.open', func);
const onOpenModalTag = (func) =>
  EventEmitter.addListener('modal.tag.open', func);
const onOpenModalCategory = (func) =>
  EventEmitter.addListener('modal.category.open', func);
const onOpenUserModal = (func) =>
  EventEmitter.addListener('modal.user.open', func);
const onCloseUserModal = (func) =>
  EventEmitter.addListener('modal.user.close', func);
const onReadLaterUpdate = (func) =>
  EventEmitter.addListener('readLater.update', func);
const onReadLaterChangeLayout = (func) =>
  EventEmitter.addListener('readlater.changeLayout', func);
const onLoginShowError = (func) =>
  EventEmitter.addListener('login.showError', func);
const onLoginShowInfo = (func) =>
  EventEmitter.addListener('login.showInfo', func);
const onLogoutUser = (func) => EventEmitter.addListener('logout.user', func);
const onCommentShowError = (func) =>
  EventEmitter.addListener('comment.showError', func);
const onOpenBookingModal = (func) =>
  EventEmitter.addListener('modal.booking.open', func);
const onCloseBookingModal = (func) =>
  EventEmitter.addListener('modal.booking.close', func);
const onOpenCommentModal = (func) =>
  EventEmitter.addListener('modal.comment.open', func);
const onCloseCommentModal = (func) =>
  EventEmitter.addListener('modal.comment.close', func);
const onOpenSearchModal = (func) =>
  EventEmitter.addListener('modal.search.open', func);
const onCloseSearchModal = (func) =>
  EventEmitter.addListener('modal.search.close', func);
const onCloseSignModal = (func) =>
  EventEmitter.addListener('modal.login.close', func);

const onSideMenuRefresh = (func) =>
  EventEmitter.addListener('sidemenu.refresh', func);
const onOpenPhotoClick = (func) =>
  EventEmitter.addListener('open.photo.click', func);
const onClosePhotoClick = (func) =>
  EventEmitter.addListener('close.photo.click', func);
const onClearPosts = (func) =>
  EventEmitter.addListener('posts.clear.click', func);

const onNextPost = (func) => EventEmitter.addListener('open.post.next', func);

const onOpenFilterModal = (func) =>
  EventEmitter.addListener('modal.filter.open', func);
const onCloseFilterModal = (func) =>
  EventEmitter.addListener('modal.filter.close', func);

const onReopenBtnFilter = (func) =>
  EventEmitter.addListener('btnFilter.reopen', func);

const onOpenChatModal = (func) =>
  EventEmitter.addListener('modal.chat.open', func);
const onCloseChatModal = (func) =>
  EventEmitter.addListener('modal.chat.close', func);
const openChatModal = (data) => EventEmitter.emit('modal.chat.open', data);

export default {
  appChangeMenuStyle,
  openLeftMenu,
  closeLeftMenu,
  openModalLayout,
  closeModalLayout,
  openModalTag,
  openUserModal,
  closeUserModal,
  readLaterChangeLayout,
  loginShowError,
  loginShowInfo,
  newsChangeLayout,
  loginRefresh,
  logoutUser,
  homePageRefresh,
  sideMenuRefresh,
  postCardFetchData,
  openPhotoClick,
  closePhotoClick,
  clearPosts,
  nextPost,
  closeModalTag,
  openModalCategory,
  openFilterModal,
  closeFilterModal,
  reopenBtnFilter,
  openBookingModal,
  closeBookingModal,
  openCommentModal,
  closeCommentModal,
  toast,
  commentShowError,
  openSearchModal,
  closeSearchModal,

  //listener
  onOpenLeftMenu,
  onCloseLeftMenu,
  onOpenModalLayout,
  onOpenModalTag,
  onOpenUserModal,
  onCloseUserModal,
  onReadLaterUpdate,
  onReadLaterChangeLayout,
  onLoginShowError,
  onLoginShowInfo,
  onLogoutUser,
  onSideMenuRefresh,
  onOpenPhotoClick,
  onClosePhotoClick,
  onAppChangeMenuStyle,
  onClearPosts,
  onNextPost,
  onOpenModalCategory,
  onOpenFilterModal,
  onCloseFilterModal,
  onReopenBtnFilter,
  onOpenBookingModal,
  onCloseBookingModal,
  onOpenCommentModal,
  onCloseCommentModal,
  onToast,
  onCommentShowError,
  onOpenSearchModal,
  onCloseSearchModal,
  onCloseSignModal,
  onOpenChatModal,
  onCloseChatModal,
  openChatModal,
};
