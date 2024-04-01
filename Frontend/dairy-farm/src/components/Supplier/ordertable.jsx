import { useMemo, useState } from "react";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const OrderTable = () => {
  const [validationErrors, setValidationErrors] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: "_id",
        header: "Id",
        enableEditing: false,
        size: 80,
        className: "hidden",
      },
      {
        accessorKey: "orderType",
        header: "Order Type",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.orderType,
          helperText: validationErrors?.orderType,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              orderType: undefined,
            }),
        },
      },
      {
        accessorKey: "orderStatus",
        header: "Order Status",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.orderStatus,
          helperText: validationErrors?.orderStatus,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              orderStatus: undefined,
            }),
        },
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.quantity,
          helperText: validationErrors?.quantity,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              quantity: undefined,
            }),
        },
      },
      {
        accessorKey: "advanceFee",
        header: "Advance Fee",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.advanceFee,
          helperText: validationErrors?.advanceFee,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              advanceFee: undefined,
            }),
        },
      },
      {
        accessorKey: "deliveryDate",
        header: "Delivery Date",
        muiEditTextFieldProps: {
          type: "date",
          required: true,
          error: !!validationErrors?.deliveryDate,
          helperText: validationErrors?.deliveryDate,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              deliveryDate: undefined,
            }),
        },
      }
    ],
    [validationErrors]
  );

  //call CREATE hook
  const { mutateAsync: createOrder, isPending: isCreatingOrder } =
    useCreateOrder();
  //call READ hook
  const {
    data: fetchedOrders = [],
    isError: isLoadingOrdersError,
    isFetching: isFetchingOrders,
    isLoading: isLoadingOrders,
  } = useGetOrders();
  //call UPDATE hook
  const { mutateAsync: updateOrder, isPending: isUpdatingOrder } =
    useUpdateOrder();
  //call DELETE hook
  const { mutateAsync: deleteOrder, isPending: isDeletingOrder } =
    useDeleteOrder();

  //CREATE action
  const handleCreateOrder = async ({ values, table }) => {
      console.log(values); // log the values being sent
      await createOrder(values);
      table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveOrder = async ({ values, table }) => {
    await updateOrder(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      deleteOrder(row.original._id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedOrders,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingOrdersError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateOrder,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveOrder,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <div>
        <DialogTitle variant="h3">Place Order</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </div>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <div>
        <DialogTitle variant="h3">Edit Order</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </div>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        Place Order
      </Button>
    ),
    state: {
      isLoading: isLoadingOrders,
      isSaving: isCreatingOrder || isUpdatingOrder || isDeletingOrder,
      showAlertBanner: isLoadingOrdersError,
      showProgressBars: isFetchingOrders,
    },
  });

  return <MaterialReactTable table={table} />;
};

//CREATE hook (post new order to api)
function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (order) => {
      const response = await fetch("http://localhost:3000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...order, _id: undefined}),
      });
      return response.json();
    },
    onMutate: (newOrderInfo) => {
      queryClient.setQueryData(["orders"], (prevOrders) => [
        ...prevOrders,
        {
          ...newOrderInfo,
        },
      ]);
    },
  });
}

//READ hook (get orders from api)
function useGetOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/order");
      return response.json();
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put order in api)
function useUpdateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (order) => {
      const response = await fetch(
        `http://localhost:3000/api/order/${order._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...order, _id: undefined}),
        }
      );
      return response.json();
    },
    onMutate: (newOrderInfo) => {
      queryClient.setQueryData(["orders"], (prevOrders) =>
        prevOrders?.map((prevOrder) =>
          prevOrder.id === newOrderInfo.id ? newOrderInfo : prevOrder
        )
      );
    },
  });
}

//DELETE hook (delete order in api)
function useDeleteOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderId) => {
      const response = await fetch(
        `http://localhost:3000/api/order/${orderId}`,
        {
          method: "DELETE",
        }
      );
      return response.json();
    },
    onMutate: (orderId) => {
      queryClient.setQueryData(["orders"], (prevOrders) =>
        prevOrders?.filter((order) => order._id !== orderId)
      );
    },
  });
}

const queryClient = new QueryClient();

const ExampleWithProviders = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <OrderTable />
  </QueryClientProvider>
);

export default OrderTable;

const validateRequired = (value) => !!value.length;

function validateOrder(order) {
  return {
    orderType: !validateRequired(order.orderType)
      ? "Order Type is Required"
      : "",
    orderStatus: !validateRequired(order.orderStatus)
      ? "Order Status is Required"
      : "",
    quantity: !validateRequired(order.quantity) ? "Quantity is Required" : "",
    advanceFee: !validateRequired(order.advanceFee)
      ? "Advance Fee is Required"
      : "",
    deliveryDate: !validateRequired(order.deliveryDate)
      ? "Delivery Date is Required"
      : "",
  };
}
