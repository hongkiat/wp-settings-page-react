<?php

/**
 * Plugin bootstrap file.
 *
 * This file is read by WordPress to display the plugin's information in the admin area.
 *
 * @wordpress-plugin
 * Plugin Name:       Settings Page Example
 * Plugin URI:        https://example.org/plugin/settings-page-example
 * Description:       Demo of settings page with Kubrick UI components.
 * Version:           1.0.0
 * Requires at least: 5.8
 * Requires PHP:      7.4
 * Author:            John Doe
 * Author URI:        https://example.org
 * License:           GPL-2.0+
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       settings-page-example
 * Domain Path:       /inc/languages
 */


add_action('admin_menu', function () {
    add_submenu_page( 
        'options-general.php', // Parent slug.
        'Kubrick Settings',
        'Kubrick',
        'manage_options',
        'kubrick-setting',
        function () { 
            ?>
            <div class="wrap">
                <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
                <div id="root"></div>
                <noscript>
                    <p>
                        <?php esc_html_e('This setting page requires JavaScript to be enabled in your browser. Please enable JavaScript and reload the page.', 'settings-page-example'); ?>
                    </p>
                </noscript>
            </div>
            <?php
        },
    );
});

add_action('admin_enqueue_scripts', function () {
    $assets = include plugin_dir_path(__FILE__) . 'build/index.asset.php';

    wp_enqueue_script(
        'kubrick-setting', 
        plugin_dir_url(__FILE__) . 'build/index.js',
        $assets['dependencies'], 
        $assets['version'],
        true
    );

    wp_enqueue_style(
        'kubrick-setting', 
        plugin_dir_url(__FILE__) . 'build/index.css',
        [], 
        $assets['version']
    );
});

function register_settings() {
    register_setting( 'kubrick_option_group', 'admin_footer_text', [
        'type' => 'string', 
        'sanitize_callback' => 'sanitize_text_field',
        'default' => 'footer text',
        'show_in_rest' => true,
    ] ); 
}

add_action('admin_init',  'register_settings');
add_action('rest_api_init',  'register_settings');