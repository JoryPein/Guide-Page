<template>
  <body :style="{ backgroundImage: background_image_url, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}">
    <div class="nav_menu">
      <div class="nav">
        <div class="list" id="navlist">
          <ul id="navfocus">
            <li v-for="sites in bookmarks" :key="sites.name">
              <a
                href="#"
                @mouseover="hoverBox(sites.name, 1)"
                @mouseout="hoverBox(sites.name, 0)"
                >{{ sites.name }}</a
              >
            </li>
          </ul>
        </div>
        <div
          class="box"
          id="navbox"
          style="height:0px; opacity:0; overflow:hidden"
        >
          <div
            class="cont"
            style="display: none"
            v-for="set in bookmarks"
            :key="set.name"
            :id="set.name"
            @mouseover="hoverBox(set.name, 1)"
            @mouseout="hoverBox(set.name, 0)"
          >
            <ul class="sublist clearfix">
              <li v-for="sites in set.list" :key="sites.name">
                <h3 class="mcate-item-hd">
                  <span>{{ sites.name }}</span>
                </h3>
                <p class="mcate-item-bd">
                  <a
                    v-for="site in sites.list"
                    :key="site.name"
                    :href="site.url"
                    target="_blank"
                  >
                    {{ site.name }}
                  </a>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div id="button-box" style="position:absolute; left:120px; top:250px">
      <el-button
        style="background-color: #007d9c; color: #fff; border:0;"
        icon="el-icon-s-grid"
        @click="dialogFormVisible = true"
        circle
      ></el-button>
    </div>
    <div id="search-box">
      <div
        class="classTitle"
        style="background-color:#2F3D51; width:890px; border-radius:10px"
      >
        <el-link
          v-for="item in search_form"
          :key="item.name"
          :underline="false"
          @mouseenter.native="enterClass(item)"
          style="padding:15px; color:#fff"
          :style="default_link_style[item.name]"
        >
          {{ item.name }}
        </el-link>
      </div>
      <el-input
        placeholder=""
        v-model="keyword"
        resize="none"
        rows="1"
        @keyup.enter.native="Search('bing')"
        style="width:890px; outline:none; font-size:18px"
      >
      </el-input>
      <div style="margin-top:30px; width:950px">
        <el-button
          v-for="item in search_form_sub.list"
          @click="Search(item.id)"
          :key="item.id"
          style="
            width: 170px;
            margin: 0 10px 15px 0;
            color: #fff;
            border: 0;
          "
          :style="btn_style[item.id]"
        >
          {{ item.name }}
        </el-button>
      </div>
    </div>
    <el-dialog title="Console" :visible.sync="dialogFormVisible">
      <el-input
        style="margin-top: -20px"
        type="textarea"
        :rows="8"
        placeholder="input text"
        v-model="textarea"
      >
      </el-input>
      <div style="margin-top: 10px">
        <el-button style="background-color: #007d9c; color: #fff; border:0;" @click="base64encode()"
          >Base64 Encode</el-button
        >
        <el-button style="background-color: #007d9c; color: #fff; border:0;" @click="base64decode()"
          >Base64 Decode</el-button
        >
        <el-button style="background-color: #007d9c; color: #fff; border:0;" @click="md5hash()"
          >md5</el-button
        >
        <el-button style="background-color: #007d9c; color: #fff; border:0;" @click="count()"
          >count</el-button
        >
      </div>
    </el-dialog>
  </body>
</template>

<script>
import search_form_data from "@/static/data/searchs.json";
import bookmark_data from "@/static/data/bookmarks.json";
import md5 from "js-md5";

var search_form = search_form_data.list;
var bookmarks = bookmark_data.list;
var timeout = null;

function encodeUnicode(str) {
  return btoa(
    encodeURIComponent(str).replace(
      /%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode("0x" + p1);
      }
    )
  );
}

function decodeUnicode(str) {
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}

function getUrlByItems(items, keyword) {
  var url = "";
  if (items.length >= 1) {
    url = items[0] + keyword;
  }
  if (items.length == 2) {
    url += items[1];
  }
  return url;
}
export default {
  methods: {
    Search: function (id) {
      let url = getUrlByItems(this.searchItemsDictionary[id].url, this.keyword);
      window.open(url);
    },
    enterClass: function (item) {
      this.default_link_style = this.get_default_link_style();
      this.search_form_sub = item;
      this.default_link_style[item.name] = {
        color: "#ff0",
      };
    },
    getSearchItemsDictionary: function () {
      var dic = {};
      search_form.forEach(function (class_item) {
        class_item.list.forEach(function (site_item) {
          dic[site_item.id] = site_item;
        });
      });
      return dic;
    },
    getBtnStyle: function () {
      var dic = {};
      for (var id in this.searchItemsDictionary) {
        dic[id] = {
          "background-color": "#" + this.searchItemsDictionary[id].color,
        };
      }
      return dic;
    },
    get_default_link_style: function () {
      var dic = {};
      for (var class_name in search_form) {
        dic[class_name] = {
          color: "#fff",
        };
      }
      return dic;
    },
    showBox: function () {
      let box = document.querySelector("#navbox");
      box.style.height = `500px`;
      box.style.opacity = 1;
      box.style.transition = "height 0.4s, pacity 0.4s";
    },
    hideBox: function () {
      let box = document.querySelector("#navbox");
      box.style.height = 0;
      box.style.opacity = 1;
      box.style.transition = "height 0.4s, pacity 0.4s";
    },
    getContItem: function (itemName) {
      let result = null;
      document.querySelectorAll(".cont").forEach(function (contItem) {
        if (contItem.id === itemName) {
          result = contItem;
        }
      });
      return result;
    },
    hoverBox: function (itemName, flag) {
      var contItem = this.getContItem(itemName);
      if (flag == 1) {
        clearTimeout(timeout);
        contItem.style.display = "block";
        this.showBox();
      } else {
        contItem.style.display = "none";
        timeout = setTimeout(() => {
          this.hideBox();
        }, 50);
      }
    },
    base64encode: function () {
      this.textarea = encodeUnicode(this.textarea);
    },
    base64decode: function () {
      this.textarea = decodeUnicode(this.textarea);
    },
    md5hash: function () {
      this.textarea = md5(this.textarea);
    },
    count: function () {
      if (typeof(this.textarea) === "string") {
        this.textarea = this.textarea.length;
      }
      
    },
  },
  data() {
    this.searchItemsDictionary = this.getSearchItemsDictionary();
    this.search_form_sub = search_form[0];
    this.btn_style = this.getBtnStyle();
    this.default_link_style = this.get_default_link_style();
    this.enterClass(this.search_form_sub);
    return {
      search_form: search_form,
      bookmarks: bookmarks,
      keyword: "",
      search_form_sub: this.search_form_sub,
      btn_style: this.btn_style,
      default_link_style: this.default_link_style,
      background_image_url:
        "url(" + require("@/static/image/bg.jpg").default + ")",
      dialogFormVisible: false,
      textarea: "",
    };
  },
};
</script>

<style>
@import "@/static/style/nav.css";

div#search-box {
  position: relative;
  top: 100px;
  width: 900px;
  left: 200px;
}
</style>