<template>
    <div class="classMain">
        <b-navbar toggleable="md" fixed="top" type="dark" variant="dark">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-item>
                        <router-link to="/Section2" tag="li">Section 2</router-link>
                    </b-nav-item>
                    <b-nav-item>
                        <router-link to="/Section3" tag="li">Section 3</router-link>
                    </b-nav-item>
                    <b-nav-item>
                        <router-link to="/Project1" tag="li">Project 1</router-link>
                    </b-nav-item>
                    <b-nav-item>
                        <router-link to="/Project4" tag="li">Section 4</router-link>
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <router-view></router-view>
    </div>
</template>