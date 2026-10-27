import { describe, it, expect, afterEach } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { flushPromises } from '@vue/test-utils';
import { useRouter } from '#imports';
import AppNavbar from '~/components/AppNavbar.vue';

let wrapper;
afterEach(() => wrapper?.unmount());

describe('main navigation', () => {
  it('keeps all five destinations named and marks only the current page', async () => {
    wrapper = await mountSuspended(AppNavbar, { route: '/' });
    const links = wrapper.findAll('a');
    expect(wrapper.find('nav').attributes('aria-label')).toBe('Main navigation');
    expect(links.map((link) => [link.text(), link.attributes('href')])).toEqual([
      ['Home', '/'],
      ['Blog', '/blog'],
      ['Gallery', '/gallery'],
      ['Contact', '/contact'],
      ['About', '/about'],
    ]);
    expect(wrapper.findAll('[aria-current]')).toHaveLength(1);
    expect(links[0].attributes('aria-current')).toBe('page');
    expect(
      links.every((link) => link.find('.nav-link__icon').attributes('aria-hidden') === 'true')
    ).toBe(true);
  });

  it('keeps Blog current for an article and follows subsequent navigation', async () => {
    wrapper = await mountSuspended(AppNavbar, { route: '/blog/building-a-file-based-blog' });
    expect(wrapper.findAll('.is-active')).toHaveLength(1);
    expect(wrapper.find('[aria-current="location"]').text()).toBe('Blog');
    await useRouter().push('/contact');
    await flushPromises();
    expect(wrapper.findAll('.is-active')).toHaveLength(1);
    expect(wrapper.findAll('[aria-current]')).toHaveLength(1);
    expect(wrapper.find('[aria-current="page"]').text()).toBe('Contact');
  });
});
