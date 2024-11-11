import { renderHook, act } from "@testing-library/react";
import { useTodo } from "../useTodo";
import { TODO_LIST } from "../../pages/Todo/initial-state";


describe("useTodo Hook", () => {
  it("should initialize with the TODO_LIST list", async () => {
    const { result } = renderHook(() => useTodo());
    expect(result.current.items).toEqual(TODO_LIST);
  });

  it("should update searchInputValue when calling handleSearchChange", () => {
    const { result } = renderHook(() => useTodo());
    const event = { target: { value: "exemplo" } } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleSearchChange(event);
    });

    expect(result.current.searchInputValue).toBe("exemplo");
  });

  it("should set the search when handleSearchSubmit is called", () => {
    const { result } = renderHook(() => useTodo());

    act(() => {
      result.current.handleSearchChange({ target: { value: "teste" } } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleSearchSubmit({
        preventDefault: jest.fn(),
        currentTarget: {} as Element,
        target: {} as Element,
        bubbles: false,
        cancelable: false,
      } as unknown as React.FormEvent);
    });

    expect(result.current.searchInputValue).toBe("teste");
    expect(result.current.items).toEqual(TODO_LIST);
  });

  it("should delete a task when call handleDeleteTask", () => {
    const { result } = renderHook(() => useTodo());
    const idToDelete = TODO_LIST[0].id;

    act(() => {
      result.current.handleDeleteTask(idToDelete);
    });

    expect(result.current.items).toEqual(TODO_LIST.filter((item) => item.id !== idToDelete));
  });

  it("should change the task status when call handleChangeTaskStatus", () => {
    const { result } = renderHook(() => useTodo());
    const idToChange = TODO_LIST[0].id;
    const initialStatus = TODO_LIST[0].status;

    act(() => {
      result.current.handleChangeTaskStatus(idToChange, initialStatus);
    });

    expect(result.current.items[0].status).toBe(initialStatus === "done" ? "pending" : "done");
  });
});
