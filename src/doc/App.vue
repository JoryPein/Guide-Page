<template>
  <body>
    <div id="collections">
      <ul>
        <li
          v-for="(value_collection, key_name) in collections_data"
          :key="key_name"
        >
          <div>
            <span style="color:#94558D">{{ key_name }}</span>
            <ul>
              <li
                v-for="(subvalue_collection, subkey_name) in value_collection"
                :key="subkey_name"
              >
                <div>
                  <span style="color:#44B78B">{{ subkey_name }}</span>
                  <ul>
                    <li
                      v-for="(subsubvalue_collection,
                      subsubkey_name) in subvalue_collection"
                      :key="subsubkey_name"
                    >
                      <a
                        :href="subsubvalue_collection.url"
                        target="_blank"
                        style="color: #A9B7C6;"
                        >{{ subsubvalue_collection.name }}</a
                      >
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </body>
</template>

<script>
import collections_data from "@/doc/static/data/collections.json";

export default {
  methods: {},
  data() {
    return {
      collections_data,
    };
  },
};
</script>

<style>
body {
  color: #fff;
  background: #2b2b2b;
}
a {
  color: #83b6c5;
  text-decoration: none;
}
</style>
