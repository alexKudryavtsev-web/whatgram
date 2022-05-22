import React, { useCallback, useContext, useEffect, useState } from "react";
import { Flex, Heading, IconButton, VStack } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../contexts/AuthContext.js";
import useHttp from "../../hooks/useHttp.js";
import ContactItem from "../contactItem/ContactItem.jsx";
import Loader from "../ui/loader/Loader.jsx";

function ContactsList() {
  const { request } = useHttp();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [contacts, setContacts] = useState(null);

  const fetchContacts = useCallback(async () => {
    const response = await request(
      "/api/contact",
      "GET",
      null,
      auth.calculateHeader(),
      auth
    );
    setContacts(response);
  }, [setContacts, request, auth]);

  useEffect(() => {
    fetchContacts();
  }, []);

  if (!contacts) {
    return <Loader />;
  }

  return (
    <VStack align="stretch">
      <Flex justifyContent="flex-end">
        <IconButton
          marginRight={2}
          icon={<FaEdit />}
          onClick={() => navigate("/contacts/create")}
          variant="ghost"
        />
      </Flex>
      {contacts.length === 0 && (
        <Heading textAlign="center" size="lg">
          Contacts does not exist yet
        </Heading>
      )}
      {contacts.map((contact) => (
        <ContactItem {...contact} key={contact.contactId} />
      ))}
    </VStack>
  );
}

export default ContactsList;
