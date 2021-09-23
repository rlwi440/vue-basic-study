<template>
  <section class="home">
    <div>
      <h1>
        CleanDev'S Home page
      </h1>
      <h2 @click="$router.push('/about')">
        About
      </h2>
      <router-link 
        to="/todos" 
        tag="h2"
      >
        Todo App
      </router-link>
    </div>
  </section>
</template>

