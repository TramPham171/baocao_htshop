<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'ngoctramshop' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'ZZK<M.Ow|IdS^0%U;T8#C%.CRFobc>RiWQ;F{iSyS<+7]1Q84U([?<0H-y2i1m$M' );
define( 'SECURE_AUTH_KEY',  'Z-lhCepHpqm^*IFnY?rl9lE?M[_*J#,EO =LwQ}F;Nt^lLY6z9-AOrmvdrlZRwBH' );
define( 'LOGGED_IN_KEY',    'w9w}vr#c2UmnAs}O<]RkQ=6zw*k1) HeyW gOk_~$.r>.h{ZJTjy,dI&OMcgzs]R' );
define( 'NONCE_KEY',        '&V%c]A3v&Sk_o#0))LHoe[>5w2@|7/}V&e}u]MA~_X-fR&URG }1EBkfk;[EWx/|' );
define( 'AUTH_SALT',        'KeeE(PA`q>Q]dt[fI+/o|>l3J iCW<W|47ANv3IIg-n%%I?R^-_~7Azq<Xe,k|N&' );
define( 'SECURE_AUTH_SALT', 'atA63B xHc0q}5O+J ;?;10?KOJo?t|tm:O-Uk[V3H669LHNK-G6Y@_-M9Cyxo5D' );
define( 'LOGGED_IN_SALT',   'R+>RhHgBa7Tt%[:J1%m^xL~^QN,e{nuFkf$#$iga=ZS0+7w[r=Tw($SbSRy]R2S/' );
define( 'NONCE_SALT',       'Sa)nQ<?C+>)=d5E`552zEn.F3g~4+:KV;e&)s 0{8Ju)#yxqSoA:us+T0Xd607|c' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
