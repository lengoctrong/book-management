<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <router-link to="/" class="navbar-brand">Quản lý mượn sách</router-link>
    <div class="mr-auto navbar-nav">
      <li class="nav-item">
        <router-link :to="{ name: 'book' }" class="nav-link"
          >Loại sách <i class="fas fa-book"></i
        ></router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'book.borrow' }" class="nav-link"
          >Mượn sách <i class="fa-regular fa-pen-to-square"></i>
        </router-link>
      </li>
    </div>
  </nav>
</template>
