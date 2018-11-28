import sortingFun from "../public/sorting";

let article = [
  {
    id: 0,
    date: "2018-11-11",
    imgUrl: require("../component/userArticle/images/index_banner1.jpg"),
    title: "2018-11-11",
    comments: 2356,
    givelike: {
      number: 6589,
      isChoose: false
    },
    collection: {
      number: 564,
      isChoose: false
    }
  },
  {
    id: 1,
    date: "2018-10-11",
    imgUrl: require("../component/userArticle/images/index_banner2.jpg"),
    title: "2018-10-11",
    comments: 2136,
    givelike: {
      number: 1289,
      isChoose: false
    },
    collection: {
      number: 230,
      isChoose: true
    }
  },
  {
    id: 2,
    date: "2014-10-11",
    imgUrl: require("../component/userArticle/images/index_banner3.jpg"),
    title: "2014-10-11",
    comments: 6587,
    givelike: {
      number: 554,
      isChoose: true
    },
    collection: {
      number: 0,
      isChoose: false
    }
  },
  {
    id: 3,
    date: "2016-02-11",
    imgUrl: require("../component/userArticle/images/index_banner4.jpg"),
    title: "2016-02-11",
    comments: 6987123,
    givelike: {
      number: 2365124,
      isChoose: false
    },
    collection: {
      number: 1475,
      isChoose: true
    }
  },
  {
    id: 4,
    date: "2018-03-11",
    imgUrl: require("../component/userArticle/images/index_banner1.jpg"),
    title: "2018-03-11",
    comments: 6987123,
    givelike: {
      number: 2365124,
      isChoose: false
    },
    collection: {
      number: 1475,
      isChoose: true
    }
  }
];

const articleStore = (state = sortingFun(article, "date"), action) => {
  switch (action.type) {
    case "CHANGE_ARTICLE":
      const temporaryIsC = state[action.dataNumber][action.dataName];
      const temporaryNum = state[action.dataNumber][action.dataName];
      Object.assign(temporaryIsC, temporaryIsC, { isChoose: action.dataValue });
      Object.assign(temporaryNum, temporaryNum, {
        number: temporaryNum.number + (1 * action.dataValue ? 1 : -1)
      });
      return Object.assign([], state);
    default:
      return state;
  }
};
export default articleStore;
