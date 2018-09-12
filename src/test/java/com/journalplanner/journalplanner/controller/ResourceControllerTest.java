package com.journalplanner.journalplanner.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.journalplanner.journalplanner.model.Resource;
import com.journalplanner.journalplanner.service.ResourceService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static junit.framework.TestCase.assertEquals;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class ResourceControllerTest {

    private static final String url = "/api/resource/";

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private ResourceService resourceService;

    @InjectMocks
    private ResourceController resourceController;

    private ObjectMapper mapper = new ObjectMapper();

    Set<Resource> testResources = new HashSet<>();

    @Before
    public void setup(){
        mockMvc = MockMvcBuilders.standaloneSetup(resourceController).build();

        Resource testResource = new Resource();
        testResource.setId(1);
        testResource.setName("testResource1");
        testResource.setMemo("testing memo 1");

        Resource testResource2 = new Resource();
        testResource2.setId(2);
        testResource2.setName("test Resource 2");
        testResource2.setMemo("testing memo 2");

        testResources = Stream.of(testResource, testResource2).collect(Collectors.toSet());

        given(resourceService.getAllResources()).willReturn(testResources);
    }

    @Test
    public void testGetAllResources() throws Exception {
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get(url+"all"))
                .andExpect(status().is2xxSuccessful()).andReturn();

        Set<Resource> resultResources = mapper.readValue(result.getResponse().getContentAsString(),
                mapper.getTypeFactory().constructCollectionType(Set.class, Resource.class));
        assertEquals(resultResources.size(), testResources.size());
    }
}
