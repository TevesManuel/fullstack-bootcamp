import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

const test_blog = {
    title: 'any title text',
    author: 'Manuel Teves',
    likes: 5,
    url: 'any url',
};

test('renders content', () => {
    render(<Blog blog={test_blog} updateBL={() => {}} />);
    expect(screen.getByText(test_blog.title)).toBeDefined();
    expect(screen.getByText(test_blog.author)).toBeDefined();
    expect(screen.queryByText(test_blog.likes)).toBeNull();
    expect(screen.queryByText(test_blog.url)).toBeNull();
});

test('clicking the button calls event handler once', async () => {
    // const mockHandler = vi.fn();

    render(<Blog blog={test_blog} updateBL={() => {}} />);

    let element = screen.getByText(test_blog.title);

    const user = userEvent.setup();
    await user.click(element);

    expect(screen.getByText(test_blog.title)).toBeDefined();
    expect(screen.getByText(test_blog.author)).toBeDefined();
    expect(screen.queryByText(test_blog.likes)).toBeDefined();
    expect(screen.queryByText(test_blog.url)).toBeDefined();
    // expect(mockHandler.mock.calls).toHaveLength(1);
});