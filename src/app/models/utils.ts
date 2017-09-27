import * as jQuery from 'jquery';

export class Utils {
  public static setupLoginForm() {
    jQuery(document).ready(function() {
      jQuery('input').blur(function() {
        const $this = jQuery(this);
        if ($this.val()) {
          $this.addClass('used');
        } else {
          $this.removeClass('used');
        }
      });

      const $ripples = jQuery('.ripples');

      $ripples.on('click.Ripples', function(e) {

        const $this = jQuery(this);
        const $offset = $this.parent().offset();
        const $circle = $this.find('.ripplesCircle');

        const x = e.pageX - $offset.left;
        const y = e.pageY - $offset.top;

        $circle.css({
          top: y + 'px',
          left: x + 'px'
        });

        $this.addClass('is-active');

      });

      $ripples.on('animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd', function(e) {
        jQuery(this).removeClass('is-active');
      });

    });
  }
}
