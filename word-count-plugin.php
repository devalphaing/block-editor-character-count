<?php
/*
Plugin Name: Word Count Plugin
Description: A plugin integrated with React for counting number of words in a blog.
Version: 1.0
Author: Devang Sharma
*/

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class WordCount {
    function __construct() {
        // add_action('enqueue_block_editor_assets', array($this, 'adminAssets'));
        add_action('init', array($this, 'adminAssets'));
    }

    function adminAssets() {
        wp_enqueue_script('ournewblocktype', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element'));
        // register_block_type('ourplugin/word-count', array(
        //     'editor_script' => 'ournewblocktype',
        //     'render_callback' => array($this, 'theHTML')
        // ));
    }

    // function theHTML($attributes) {
    //     return '<h3> Word Count = ' . $attributes['wordCount'] . ' </h3>';
    // }
}

$WordCount = new WordCount();
