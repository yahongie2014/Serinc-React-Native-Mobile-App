/** @format */

import Images from './Images';
import Constants from './Constants';
import Icons from './Icons';

export default {
  ProductSize: {
    enable: false,
    CatalogImages: {width: 300, height: 360},
    SingleProductImage: {width: 600, height: 720},
    ProductThumbnails: {width: 180, height: 216},
  },

  HomeCategories: {
    layout: Constants.Layout.categories,
    items: [
      {
        name: 'Bags',
        category: '5b2c660ccdb2ff05c726740b',
        color: '#00b2bc',
      },
      {
        name: 'Jackets',
        category: '5b2c6633cdb2ff05c726740c',
        color: '#E2932B',
      },
      {
        name: 'Jeans',
        category: '5b2c6659cdb2ff05c726740d',
        color: '#FF6A52',
      },
      {
        name: 'Shirts',
        category: '5b2c6674cdb2ff05c726740e',
        color: '#7FFFD4',
      },
      {
        name: 'Shoes',
        category: '5b2c6683cdb2ff05c726740f',
        color: '#DCDCDC',
      },
    ],
  },

  HomeNews: {
    name: 'News',
    type: 'article',
    layoutType: 'post', // "post" or "product" is default
    layout: Constants.Layout.threeColumn,
  },
  /**
   * TODO: add document
   * and refactor
   */
  CategoryLayout: {
    ListMode: 'ListMode',
    GridMode: 'GridMode',
    CardMode: 'CardMode',
  },

  /**
     step 3: Config image for the Payment Gateway
     Notes:
     - Only the image list here will be shown on the app but it should match with the key id from the WooCommerce Website config
     - It's flexible way to control list of your payment as well
     Ex. if you would like to show only cod then just put one cod image in the list
     * */
  Payments: [],

  /**
     Step 4: Advance config:
     - showShipping: option to show the list of shipping method
     - showStatusBar: option to show the status bar, it always show iPhoneX
     - LogoImage: The header logo
     - appFacebookId: The app facebook ID, use for Facebook login
     - CustomPages: Update the custom page which can be shown from the left side bar (Components/Drawer/index.js)
     - WebPages: This could be the id of your blog post or the full URL which point to any Webpage (responsive mobile is required on the web page)
     - CategoryListView: default layout for category (true/false)
     - intro: The on boarding intro slider for your app
     - menu: config for left menu side items (isMultiChild: This is new feature from 3.4.5 that show the sub products categories)
     * */
  shipping: {
    visible: true,
    time: {
      free_shipping: '4 - 7 Days',
      flat_rate: '1 - 4 Days',
      local_pickup: '1 - 4 Days',
    },
  },
  showStatusBar: true,

  showAdmobAds: true,
  AdMob: {
    deviceID: 'pub-2101182411274198',
    unitID: 'ca-app-pub-2101182411274198/4100506392',
    unitInterstitial: 'ca-app-pub-2101182411274198/8930161243',
    isShowInterstital: true,
  },
  appFacebookId: '422035778152242',
  CustomPages: {contact_id: 10941},
  CategoryListView: true,
  // Layout select
  layouts: [
    {
      layout: Constants.Layout.card,
      image: Images.icons.iconCard,
      text: 'cardView',
    },
    {
      layout: Constants.Layout.simple,
      image: Images.icons.iconRight,
      text: 'simpleView',
    },
    {
      layout: Constants.Layout.twoColumn,
      image: Images.icons.iconColumn,
      text: 'twoColumnView',
    },
    {
      layout: Constants.Layout.threeColumn,
      image: Images.icons.iconThree,
      text: 'threeColumnView',
    },
    {
      layout: Constants.Layout.horizon,
      image: Images.icons.iconHorizal,
      text: 'horizontal',
    },
    {
      layout: Constants.Layout.advance,
      image: Images.icons.iconAdvance,
      text: 'advanceView',
    },
  ],

  StripePayment: {
    enabled: true,
    publicKey: 'pk_test_FCVojuw6ETvRPXErJhhzG2cT',
  },
};
